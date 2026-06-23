/**
 * Tests every story and case-media image URL through the proxy
 * and replaces any that fail with a working fallback.
 * Run: node src/fix-broken-images.js
 */
require('dotenv').config();
const http = require('http');
const prisma = require('./utils/prisma');

// Verified working Unsplash photo IDs (tested manually)
const WORKING = {
  thriller: [
    'photo-1509909756405-be0199881695',
    'photo-1541354329998-f4d9a9f9297f',
    'photo-1547153760-18fc86324498',
    'photo-1578328819058-b69f3a3b0f6b',
    'photo-1605806616949-1e0a6728ab22',
    'photo-1531058020387-3be344556be6',
    'photo-1524234107056-1c1f48f64ab8',
    'photo-1470240731741-9eb7a3e9e5fc',
  ],
  mystery: [
    'photo-1477346611705-65d1883cee1e',
    'photo-1508739773434-c26b3d09e071',
    'photo-1504711434969-e33886168f5c',
    'photo-1448375240586-882707db888b',
    'photo-1534447677768-be436bb09401',
    'photo-1445991842686-7b19ffe2e7b5',
    'photo-1518531933037-91b2f5f229cc',
    'photo-1473116763249-2faaef81ccda',
  ],
  drama: [
    'photo-1467803738586-46b7eb7b16a1',
    'photo-1529156069898-49953e39b3ac',
    'photo-1518455027359-f3f8164ba6bd',
    'photo-1562408590-e32931084e23',
    'photo-1498931299472-f7a63a5a1cfa',
    'photo-1465146344425-f00d5f5c8f07',
    'photo-1516912481808-3406841bd33c',
    'photo-1520209268518-aec60b8bb5ca',
  ],
  horror: [
    'photo-1517022812141-23620dba5c23',
    'photo-1551818255-e6e10975bc17',
    'photo-1590076082859-4b8b8b55e893',
    'photo-1543466835-00a7907e9de1',
    'photo-1509470475192-4516873f1f37',
    'photo-1574943320219-553eb213f72d',
    'photo-1519090688720-1668e2c72a16',
    'photo-1567958451986-2de427a4a0be',
  ],
  fantasy: [
    'photo-1518709268805-4e9042af9f23',
    'photo-1506905925346-21bda4d32df4',
    'photo-1477346611705-65d1883cee1e',
    'photo-1448375240586-882707db888b',
    'photo-1470240731741-9eb7a3e9e5fc',
    'photo-1534447677768-be436bb09401',
    'photo-1453728013993-6d66e9c9123a',
    'photo-1531058020387-3be344556be6',
  ],
  other: [
    'photo-1453728013993-6d66e9c9123a',
    'photo-1508739773434-c26b3d09e071',
    'photo-1470240731741-9eb7a3e9e5fc',
    'photo-1531058020387-3be344556be6',
    'photo-1517022812141-23620dba5c23',
    'photo-1541354329998-f4d9a9f9297f',
    'photo-1547153760-18fc86324498',
    'photo-1524234107056-1c1f48f64ab8',
  ],
};

const PROXY_BASE = 'http://localhost:5000/api/imgproxy?url=';

function makeUrl(photoId) {
  const direct = `https://images.unsplash.com/${photoId}?w=800&h=450&fit=crop&auto=format&q=80`;
  return PROXY_BASE + encodeURIComponent(direct);
}

function extractPhotoId(proxyUrl) {
  try {
    const inner = decodeURIComponent(proxyUrl.replace(PROXY_BASE, ''));
    const match = inner.match(/(photo-[a-f0-9-]+)/);
    return match ? match[1] : null;
  } catch { return null; }
}

// Returns true if the proxied URL returns a real image
function testUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 6000 }, (res) => {
      const ok = res.statusCode === 200 &&
        (res.headers['content-type'] || '').startsWith('image/');
      // drain response to free socket
      res.resume();
      resolve(ok);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

// Get a replacement URL for a given genre using round-robin
const counters = {};
function getReplacement(genre) {
  const g = WORKING[genre] ? genre : 'other';
  const pool = WORKING[g];
  if (!(g in counters)) counters[g] = 0;
  const photoId = pool[counters[g] % pool.length];
  counters[g]++;
  return makeUrl(photoId);
}

async function main() {
  console.log('\n🔍 Testing all story cover images...\n');

  const stories = await prisma.story.findMany({
    select: { id: true, title: true, genre: true, coverImage: true }
  });

  let fixed = 0;
  for (const s of stories) {
    if (!s.coverImage) continue;
    const ok = await testUrl(s.coverImage);
    if (!ok) {
      const newUrl = getReplacement(s.genre || 'other');
      await prisma.story.update({ where: { id: s.id }, data: { coverImage: newUrl } });
      console.log(`  ✗ BROKEN → fixed: [${(s.genre||'other').padEnd(8)}] ${s.title}`);
      fixed++;
    } else {
      process.stdout.write('.');
    }
  }
  console.log(`\n\n  Stories: fixed ${fixed} broken images\n`);

  console.log('🔍 Testing all case media images...\n');
  const media = await prisma.caseMedia.findMany({
    include: { case: { select: { category: true } } }
  });

  let mFixed = 0;
  // Import caseImage util for proper category-based replacement
  const { getCaseImageUrl } = require('./utils/caseImage');
  for (const m of media) {
    if (!m.url) continue;
    const ok = await testUrl(m.url);
    if (!ok) {
      const cat = m.case?.category || 'other';
      // Generate a new direct URL and proxy it
      const directUrl = getCaseImageUrl(m.id + 'fixed', cat, '');
      const newUrl = PROXY_BASE + encodeURIComponent(directUrl);
      await prisma.caseMedia.update({ where: { id: m.id }, data: { url: newUrl } });
      process.stdout.write('x');
      mFixed++;
    } else {
      process.stdout.write('.');
    }
  }
  console.log(`\n\n  Case media: fixed ${mFixed} broken images\n`);

  console.log(`✅ Done! Total fixed: ${fixed + mFixed}`);
  console.log('   Refresh http://localhost:5173 to see the results.\n');
}

main()
  .catch(err => { console.error('Fatal:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
