/**
 * Removes duplicate stories (same title) keeping only the one with most views.
 * Also removes duplicate case media (keeps only one image per case).
 */
require('dotenv').config();
const prisma = require('./utils/prisma');

async function main() {
  // ── Deduplicate stories ────────────────────────────────────────────────────
  const stories = await prisma.story.findMany({ orderBy: { views: 'desc' } });
  const seenTitles = new Map();
  const toDeleteStories = [];

  for (const s of stories) {
    if (seenTitles.has(s.title)) {
      toDeleteStories.push(s.id);
    } else {
      seenTitles.set(s.title, s.id);
    }
  }

  if (toDeleteStories.length > 0) {
    // Delete comments on duplicate stories first
    await prisma.comment.deleteMany({ where: { storyId: { in: toDeleteStories } } });
    await prisma.story.deleteMany({ where: { id: { in: toDeleteStories } } });
    console.log(`Deleted ${toDeleteStories.length} duplicate stories`);
  } else {
    console.log('No duplicate stories found');
  }

  // ── Deduplicate case media (keep one image per case) ───────────────────────
  const cases = await prisma.case.findMany({
    include: { media: { where: { type: 'image' }, orderBy: { createdAt: 'asc' } } }
  });

  let mediaDeleted = 0;
  for (const c of cases) {
    if (c.media.length > 1) {
      const [, ...extras] = c.media;
      await prisma.caseMedia.deleteMany({ where: { id: { in: extras.map(m => m.id) } } });
      mediaDeleted += extras.length;
    }
  }

  if (mediaDeleted > 0) console.log(`Deleted ${mediaDeleted} duplicate case media records`);
  else console.log('No duplicate case media found');
}

main().catch(console.error).finally(() => prisma.$disconnect());
