/**
 * Rebuilds image URLs for EVERY case unconditionally.
 * Ensures every case has exactly one image with a valid Unsplash URL.
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getCaseImageUrl } = require('./utils/caseImage');

async function main() {
  const cases = await prisma.case.findMany({
    include: { media: { where: { type: 'image' } } },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`Fixing images for ${cases.length} cases...`);
  let updated = 0, added = 0;

  for (const c of cases) {
    const newUrl = getCaseImageUrl(c.id, c.category, c.title);

    if (c.media.length === 0) {
      await prisma.caseMedia.create({
        data: { caseId: c.id, type: 'image', url: newUrl, caption: 'Cover image' }
      });
      added++;
    } else {
      // Delete all but keep one, update it to the new URL
      if (c.media.length > 1) {
        await prisma.caseMedia.deleteMany({
          where: { id: { in: c.media.slice(1).map(m => m.id) } }
        });
      }
      await prisma.caseMedia.update({
        where: { id: c.media[0].id },
        data: { url: newUrl }
      });
      updated++;
    }
  }

  console.log(`Done — ${updated} updated, ${added} added`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
