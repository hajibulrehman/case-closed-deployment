/**
 * Backfill / refresh images for all cases.
 * 
 * Usage:
 *   node src/backfill-images.js           — only fill cases with NO image
 *   node src/backfill-images.js --replace  — replace ALL auto-assigned images (re-roll)
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getCaseImageUrl, assignImagesSequentially } = require('./utils/caseImage');

async function main() {
  const replaceAll = process.argv.includes('--replace');
  console.log(`\n🖼  ${replaceAll ? 'Replacing ALL auto-images' : 'Backfilling missing images'}...\n`);

  const cases = await prisma.case.findMany({
    include: { media: { where: { type: 'image' } } }
  });

  let targets;
  if (replaceAll) {
    // Remove all existing auto-assigned images (those with our caption pattern or Unsplash URLs)
    const autoImageCaseIds = cases
      .filter(c => c.media.some(m =>
        m.url.includes('unsplash.com') ||
        (m.caption && m.caption.includes('Cover image for'))
      ))
      .map(c => c.id);

    if (autoImageCaseIds.length > 0) {
      await prisma.caseMedia.deleteMany({
        where: {
          caseId: { in: autoImageCaseIds },
          url: { contains: 'unsplash.com' }
        }
      });
      console.log(`  Removed old auto-images from ${autoImageCaseIds.length} cases`);
    }

    targets = cases; // re-assign all
  } else {
    // Only cases with no image media at all
    targets = cases.filter(c => c.media.length === 0);
  }

  console.log(`  Processing ${targets.length} cases...\n`);

  if (targets.length === 0) {
    console.log('✅ Nothing to do — all cases already have images.\n');
    console.log('   Tip: run with --replace to refresh all auto-assigned images.\n');
    return;
  }

  let count = 0;

  // Use sequential assignment so each case gets a UNIQUE image — no repeats
  const assignments = assignImagesSequentially(
    targets.map(c => ({ id: c.id, category: c.category, title: c.title }))
  );

  for (let i = 0; i < targets.length; i++) {
    const c = targets[i];
    const { url: imageUrl } = assignments[i];
    await prisma.caseMedia.create({
      data: {
        caseId: c.id,
        type: 'image',
        url: imageUrl,
        caption: `Cover image for ${c.category} case`
      }
    });
    count++;
    console.log(`  ✓ [${c.category.padEnd(8)}] ${c.title}`);
  }

  console.log(`\n✅ Done! Assigned images to ${count} cases.`);
  console.log('   Refresh http://localhost:5173/cases to see them.\n');
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
