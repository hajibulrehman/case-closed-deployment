const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');
const upload = require('../utils/upload');
const { getCaseImageUrl } = require('../utils/caseImage');

// Get all published cases (public)
router.get('/', async (req, res) => {
  try {
    const { category, section, search, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { status: 'published' };
    if (category && category !== 'all') where.category = category;
    if (section) {
      where.section = section;
    } else {
      // Default: Real Cases page only shows solved (section = 'cases')
      where.section = 'cases';
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } }
      ];
    }

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        include: { media: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.case.count({ where })
    ]);

    res.json({ cases, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured cases
router.get('/featured', async (req, res) => {
  try {
    const cases = await prisma.case.findMany({
      where: { status: 'published', featured: true, section: 'cases' },
      include: { media: { take: 1 } },
      orderBy: { createdAt: 'desc' },
      take: 6
    });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single case (public)
router.get('/:id', async (req, res) => {
  try {
    const caseItem = await prisma.case.findUnique({
      where: { id: req.params.id },
      include: {
        media: true,
        stories: {
          where: { status: 'published', type: 'fantasy' },
          include: { author: { select: { username: true, avatar: true } } },
          orderBy: { createdAt: 'desc' }
        },
        comments: {
          include: { author: { select: { username: true, avatar: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    // Ensure new detail fields are included (Prisma selects all scalar fields by default)
    if (!caseItem || caseItem.status !== 'published')
      return res.status(404).json({ message: 'Case not found' });
    res.json(caseItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all cases
router.get('/admin/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const cases = await prisma.case.findMany({
      include: { media: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: create case
router.post('/', authenticate, requireAdmin, upload.array('media', 20), async (req, res) => {
  try {
    const {
      title, category, section, summary, fullContent,
      location, date, featured, status,
      victims, perpetrator, verdict, keyFacts, timeline, links
    } = req.body;
    if (!title || !category || !summary || !fullContent)
      return res.status(400).json({ message: 'Required fields missing' });

    const newCase = await prisma.case.create({
      data: {
        title, category, summary, fullContent,
        section:     section     || 'cases',
        location:    location    || null,
        date:        date        || null,
        featured:    featured === 'true',
        status:      status      || 'published',
        victims:     victims     || null,
        perpetrator: perpetrator || null,
        verdict:     verdict     || null,
        keyFacts:    keyFacts    || null,
        timeline:    timeline    || null,
        links:       links       || null,
      }
    });

    if (req.files && req.files.length > 0) {
      const mediaData = req.files.map(file => ({
        caseId: newCase.id,
        type: file.mimetype.startsWith('image/') ? 'image'
            : file.mimetype.startsWith('audio/') ? 'audio'
            : file.mimetype.startsWith('video/') ? 'video'
            : 'document',
        url: `/uploads/${file.destination.split('/')[1]}/${file.filename}`
      }));
      await prisma.caseMedia.createMany({ data: mediaData });
    } else {
      // No files uploaded — auto-assign a relevant AI/atmospheric image
      const autoImageUrl = getCaseImageUrl(newCase.id, category, title);
      await prisma.caseMedia.create({
        data: {
          caseId: newCase.id,
          type: 'image',
          url: autoImageUrl,
          caption: `Auto-generated cover image for ${category} case`
        }
      });
    }

    const created = await prisma.case.findUnique({
      where: { id: newCase.id },
      include: { media: true }
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update case
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const {
      title, category, section, summary, fullContent,
      location, date, featured, status,
      victims, perpetrator, verdict, keyFacts, timeline, links
    } = req.body;
    const updated = await prisma.case.update({
      where: { id: req.params.id },
      data: {
        title, category, summary, fullContent,
        section: section || undefined,
        location, date,
        featured: typeof featured === 'boolean' ? featured : featured === 'true',
        status,
        victims:     victims     ?? undefined,
        perpetrator: perpetrator ?? undefined,
        verdict:     verdict     ?? undefined,
        keyFacts:    keyFacts    ?? undefined,
        timeline:    timeline    ?? undefined,
        links:       links       ?? undefined,
      },
      include: { media: true }
    });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: delete case
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.case.delete({ where: { id: req.params.id } });
    res.json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment
router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });
    const comment = await prisma.comment.create({
      data: { content, authorId: req.user.id, caseId: req.params.id },
      include: { author: { select: { username: true, avatar: true } } }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
