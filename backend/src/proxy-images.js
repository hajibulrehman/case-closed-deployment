/**
 * Rewrites all external image URLs in the DB to go through /api/imgproxy
 * so they always load regardless of CORS/referer restrictions.
 *
 * Run: node src/proxy-images.js
 */
require('dotenv').config();
const prisma = require('./utils/prisma');

const BASE = 'http://localhost:5000/api/imgproxy?url=';

function wrap(url) {
  if (!url) return null;
  if (url.startsWith('/uploads/')) return url; // local file, skip
  if (url.includes('/api/imgproxy')) return url; // already proxied
  return BASE + encodeURIComponent(url);
}

async function main() {
  console.log('\n🔄 Proxying all external image URLs...\n');

  // ── Stories: coverImage ────────────────────────────────────────────────────
  const stories = await prisma.story.findMany({
    select: { id: true, coverImage: true }
  });
  let sUpdated = 0;
  for (const s of stories) {
    const proxied = wrap(s.coverImage);
    if (proxied && proxied !== s.coverImage) {
      await prisma.story.update({ where: { id: s.id }, data: { coverImage: proxied } });
      sUpdated++;
    }
  }
  console.log(`  Stories: ${sUpdated} / ${stories.length} URLs proxied`);

  // ── CaseMedia: url ─────────────────────────────────────────────────────────
  const media = await prisma.caseMedia.findMany({
    select: { id: true, url: true }
  });
  let mUpdated = 0;
  for (const m of media) {
    const proxied = wrap(m.url);
    if (proxied && proxied !== m.url) {
      await prisma.caseMedia.update({ where: { id: m.id }, data: { url: proxied } });
      mUpdated++;
    }
  }
  console.log(`  Case media: ${mUpdated} / ${media.length} URLs proxied`);

  console.log('\n✅ Done! Refresh http://localhost:5173 to see images.\n');
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
