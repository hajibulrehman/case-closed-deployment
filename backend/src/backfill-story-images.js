/**
 * Assigns cover images to all stories missing one.
 *
 * Usage:
 *   node src/backfill-story-images.js           — only fill missing
 *   node src/backfill-story-images.js --replace  — replace all auto-images
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { assignStoryImagesSequentially } = require('./utils/storyImage');

async function main() {
  const replace = process.argv.includes('--replace');
  console.log(`\n🖼  ${replace ? 'Replacing ALL story images' : 'Backfilling missing story images'}...\n`);

  const stories = await prisma.story.findMany({
    select: { id: true, title: true, genre: true, coverImage: true }
  });

  const targets = replace
    ? stories
    : stories.filter(s => !s.coverImage);

  console.log(`  ${stories.length} total stories | ${targets.length} to update\n`);

  if (targets.length === 0) {
    console.log('✅ All stories already have cover images.\n');
    console.log('   Tip: run with --replace to refresh them.\n');
    return;
  }

  const assignments = assignStoryImagesSequentially(
    targets.map(s => ({ id: s.id, genre: s.genre }))
  );

  for (let i = 0; i < targets.length; i++) {
    const s = targets[i];
    const { url } = assignments[i];
    await prisma.story.update({
      where: { id: s.id },
      data: { coverImage: url }
    });
    console.log(`  ✓ [${(s.genre || 'other').padEnd(9)}] ${s.title}`);
  }

  console.log(`\n✅ Done! ${targets.length} stories updated.`);
  console.log('   Refresh http://localhost:5173/stories\n');
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
