/**
 * Rebuilds image URLs for every case using permanent Unsplash direct CDN URLs.
 * Replaces ALL existing image media records unconditionally.
 * Adds an image to any case that has none.
 * Safe to run multiple times.
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getCaseImageUrl } = require('./utils/caseImage');

async function main() {
  const cases = await prisma.case.findMany({
    include: { media: { where: { type: 'image' } } },
  });

  console.log(`Processing images for ${cases.length} cases...`);
  let updated = 0;
  let added = 0;

  for (const c of cases) {
    const newUrl = getCaseImageUrl(c.id, c.category, c.title);

    if (c.media.length === 0) {
      // No image — create one
      await prisma.caseMedia.create({
        data: { caseId: c.id, type: 'image', url: newUrl, caption: 'Cover image' }
      });
      added++;
    } else {
      // Replace ALL image records with the correct permanent URL
      // Delete extras, keep only one
      const [first, ...extras] = c.media;

      // Delete any duplicate image records
      if (extras.length > 0) {
        await prisma.caseMedia.deleteMany({
          where: { id: { in: extras.map(m => m.id) } }
        });
      }

      // Update the first one to the new URL
      await prisma.caseMedia.update({
        where: { id: first.id },
        data: { url: newUrl }
      });
      updated++;
    }
  }

  console.log(`Done — ${updated} updated, ${added} added`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
