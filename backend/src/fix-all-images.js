/**
 * Replaces all picsum.photos URLs in CaseMedia with permanent Unsplash URLs.
 * Safe to run multiple times — only updates picsum/fastly URLs.
 * Run: node src/fix-all-images.js
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getCaseImageUrl } = require('./utils/caseImage');

async function main() {
  // Get all cases with their media
  const cases = await prisma.case.findMany({
    include: { media: { where: { type: 'image' } } },
  });

  console.log(`Found ${cases.length} cases`);
  let updated = 0;
  let added = 0;

  for (const c of cases) {
    const newUrl = getCaseImageUrl(c.id, c.category, c.title);

    if (c.media.length === 0) {
      // No image at all — create one
      await prisma.caseMedia.create({
        data: { caseId: c.id, type: 'image', url: newUrl, caption: `Cover image` }
      });
      added++;
    } else {
      // Update any picsum/fastly URLs to the new permanent Unsplash URL
      for (const m of c.media) {
        if (m.url.includes('picsum') || m.url.includes('fastly') || m.url.includes('unsplash.com/photo')) {
          await prisma.caseMedia.update({
            where: { id: m.id },
            data: { url: newUrl }
          });
          updated++;
        }
      }
    }
  }

  console.log(`Done — ${updated} updated, ${added} added`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
