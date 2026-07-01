/**
 * Fixes story cover images:
 * 1. Stories with no coverImage get one assigned
 * 2. Stories with localhost proxy URLs get the raw Unsplash URL instead
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getStoryImageUrl } = require('./utils/storyImage');

async function main() {
  const stories = await prisma.story.findMany({ select: { id: true, genre: true, coverImage: true } });
  console.log(`Found ${stories.length} stories`);

  let fixed = 0;
  for (const s of stories) {
    const needsFix = !s.coverImage || s.coverImage.includes('localhost') || s.coverImage.includes('127.0.0.1');
    if (needsFix) {
      const url = getStoryImageUrl(s.id, s.genre || 'thriller');
      await prisma.story.update({ where: { id: s.id }, data: { coverImage: url } });
      fixed++;
    }
  }
  console.log(`Fixed ${fixed} stories`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
