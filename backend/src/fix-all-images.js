/**
 * Fixes ALL broken images across stories, case media, and articles.
 * Replaces any raw external URL with a proxied one, then tests each one.
 * Run: node src/fix-all-images.js
 */
require('dotenv').config();
const http  = require('http');
const https = require('https');
const prisma = require('./utils/prisma');
const { getStoryImageUrl, assignStoryImagesSequentially } = require('./utils/storyImage');
const { assignImagesSequentially } = require('./utils/caseImage');

const PROXY = 'http://localhost:5000/api/imgproxy?url=';

function isProxied(url) {
  return url && url.startsWith('http://localhost');
}

function makeProxied(url) {
  if (!url) return null;
  if (isProxied(url)) return url;                          // already proxied
  if (url.startsWith('/uploads/')) return url;             // local file
  return PROXY + encodeURIComponent(url);
}

// Tests a URL — returns true if it loads as an image
function testUrl(url) {
  return new Promise((resolve) => {
    if (!url) return resolve(false);
    try {
      const parsed = new URL(url);
      const mod = parsed.protocol === 'https:' ? https : http;
      const req = mod.get(url, { timeout: 6000 }, (res) => {
        const ok = res.statusCode === 200 &&
          (res.headers['content-type'] || '').startsWith('image/');
        res.resume();
        resolve(ok);
      });
      req.on('error',   () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
    } catch { resolve(false); }
  });
}

// Pool of verified working Unsplash photo IDs for fallback
const FALLBACK_STORY = {
  thriller: 'photo-1509909756405-be0199881695',
  mystery:  'photo-1477346611705-65d1883cee1e',
  horror:   'photo-1551818255-e6e10975bc17',
  drama:    'photo-1529156069898-49953e39b3ac',
  fantasy:  'photo-1506905925346-21bda4d32df4',
  other:    'photo-1453728013993-6d66e9c9123a',
};

const FALLBACK_CASE = {
  murder:   'photo-1587474260584-136574b1e43a',
  missing:  'photo-1477346611705-65d1883cee1e',
  genocide: 'photo-1482235225082-9e0c51b47571',
  police:   'photo-1589994160839-163cd867cfe8',
  suicide:  'photo-1473116763249-2faaef81ccda',
  other:    'photo-1453728013993-6d66e9c9123a',
};

const FALLBACK_ARTICLE = [
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1578328819058-b69f3a3b0f6b',
  'photo-1531058020387-3be344556be6',
  'photo-1524234107056-1c1f48f64ab8',
  'photo-1453728013993-6d66e9c9123a',
  'photo-1516585427167-9f4af9627e6c',
];

let articleFallbackIdx = 0;

function fallbackStoryUrl(genre) {
  const id = FALLBACK_STORY[(genre || 'other').toLowerCase()] || FALLBACK_STORY.other;
  return PROXY + encodeURIComponent(`https://images.unsplash.com/${id}?w=800&h=450&fit=crop&auto=format&q=80`);
}

function fallbackCaseUrl(category) {
  const id = FALLBACK_CASE[(category || 'other').toLowerCase()] || FALLBACK_CASE.other;
  return PROXY + encodeURIComponent(`https://images.unsplash.com/${id}?w=800&h=500&fit=crop&auto=format&q=80`);
}

function fallbackArticleUrl() {
  const id = FALLBACK_ARTICLE[articleFallbackIdx % FALLBACK_ARTICLE.length];
  articleFallbackIdx++;
  return PROXY + encodeURIComponent(`https://images.unsplash.com/${id}?w=800&h=450&fit=crop&auto=format&q=80`);
}

async function main() {
  console.log('\n🔧 Fixing all images...\n');

  // ── 1. Stories ─────────────────────────────────────────────────────────────
  const stories = await prisma.story.findMany({ select: { id: true, title: true, genre: true, coverImage: true } });
  let sFixed = 0;
  process.stdout.write('Stories: ');
  for (const s of stories) {
    // First ensure it's proxied
    let url = makeProxied(s.coverImage);
    let ok  = url ? await testUrl(url) : false;
    if (!ok) {
      url = fallbackStoryUrl(s.genre);
      await prisma.story.update({ where: { id: s.id }, data: { coverImage: url } });
      sFixed++;
      process.stdout.write('✗');
    } else {
      if (url !== s.coverImage) {
        await prisma.story.update({ where: { id: s.id }, data: { coverImage: url } });
        sFixed++;
      }
      process.stdout.write('.');
    }
  }
  console.log(` — fixed ${sFixed}/${stories.length}`);

  // ── 2. Case media ──────────────────────────────────────────────────────────
  const media = await prisma.caseMedia.findMany({
    include: { case: { select: { category: true } } }
  });
  let mFixed = 0;
  process.stdout.write('Case media: ');
  for (const m of media) {
    let url = makeProxied(m.url);
    let ok  = url ? await testUrl(url) : false;
    if (!ok) {
      url = fallbackCaseUrl(m.case?.category);
      await prisma.caseMedia.update({ where: { id: m.id }, data: { url } });
      mFixed++;
      process.stdout.write('✗');
    } else {
      if (url !== m.url) {
        await prisma.caseMedia.update({ where: { id: m.id }, data: { url } });
        mFixed++;
      }
      process.stdout.write('.');
    }
  }
  console.log(` — fixed ${mFixed}/${media.length}`);

  // ── 3. Articles ────────────────────────────────────────────────────────────
  const articles = await prisma.article.findMany({ select: { id: true, title: true, coverImage: true } });
  let aFixed = 0;
  process.stdout.write('Articles:   ');
  for (const a of articles) {
    let url = makeProxied(a.coverImage);
    let ok  = url ? await testUrl(url) : false;
    if (!ok) {
      url = fallbackArticleUrl();
      await prisma.article.update({ where: { id: a.id }, data: { coverImage: url } });
      aFixed++;
      process.stdout.write('✗');
    } else {
      if (url !== a.coverImage) {
        await prisma.article.update({ where: { id: a.id }, data: { coverImage: url } });
        aFixed++;
      }
      process.stdout.write('.');
    }
  }
  console.log(` — fixed ${aFixed}/${articles.length}`);

  // ── 4. Quizzes ────────────────────────────────────────────────────────────
  const quizzes = await prisma.quiz.findMany({ select: { id: true, coverImage: true } });
  let qFixed = 0;
  process.stdout.write('Quizzes:    ');
  for (const q of quizzes) {
    let url = makeProxied(q.coverImage);
    let ok  = url ? await testUrl(url) : false;
    if (!ok) {
      url = fallbackArticleUrl();
      await prisma.quiz.update({ where: { id: q.id }, data: { coverImage: url } });
      qFixed++;
      process.stdout.write('✗');
    } else {
      if (url !== q.coverImage) {
        await prisma.quiz.update({ where: { id: q.id }, data: { coverImage: url } });
        qFixed++;
      }
      process.stdout.write('.');
    }
  }
  console.log(` — fixed ${qFixed}/${quizzes.length}`);

  const total = sFixed + mFixed + aFixed + qFixed;
  console.log(`\n✅ Total fixed: ${total}`);
  console.log('   Refresh http://localhost:5173\n');
}

main()
  .catch(err => { console.error('\nFatal:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
