const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');
const upload = require('../utils/upload');
const { getStoryImageUrl } = require('../utils/storyImage');

// Get published fantasy stories (public)
router.get('/fantasy', async (req, res) => {
  try {
    const { search, genre, caseId, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = { type: 'fantasy', status: 'published' };
    if (genre) where.genre = genre;
    if (caseId) where.caseId = caseId;
    if (search) where.OR = [
      { title: { contains: search } },
      { content: { contains: search } }
    ];

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        include: { author: { select: { username: true, avatar: true } }, case: { select: { title: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.story.count({ where })
    ]);
    res.json({ stories, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get published real stories (public)
router.get('/real', async (req, res) => {
  try {
    const { search, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = { type: 'real', status: 'published' };
    if (search) where.OR = [
      { title: { contains: search } },
      { content: { contains: search } }
    ];

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        include: { author: { select: { username: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.story.count({ where })
    ]);
    res.json({ stories, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single story (public)
router.get('/:id', async (req, res) => {
  try {
    const story = await prisma.story.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { username: true, avatar: true, bio: true } },
        case: { select: { id: true, title: true, category: true } },
        comments: {
          include: { author: { select: { username: true, avatar: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    if (!story || story.status !== 'published')
      return res.status(404).json({ message: 'Story not found' });

    await prisma.story.update({ where: { id: req.params.id }, data: { views: { increment: 1 } } });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create story (user - only fantasy by default, real requires admin approval)
router.post('/', authenticate, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content, caseId, type, genre, tags } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

    // Users can only create fantasy stories directly; real stories go to pending
    const storyType = type === 'real' ? 'real' : 'fantasy';
    const status = storyType === 'fantasy' ? 'published' : 'pending';

    const story = await prisma.story.create({
      data: {
        title, content,
        authorId: req.user.id,
        caseId: caseId || null,
        type: storyType,
        status,
        genre: genre || null,
        tags: tags || null,
        coverImage: req.file ? `/uploads/images/${req.file.filename}` : null
      },
      include: { author: { select: { username: true, avatar: true } } }
    });

    // Auto-assign cover image if none was uploaded
    if (!req.file) {
      const autoImage = getStoryImageUrl(story.id, genre);
      await prisma.story.update({
        where: { id: story.id },
        data: { coverImage: autoImage }
      });
      story.coverImage = autoImage;
    }

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update own story
router.put('/:id', authenticate, async (req, res) => {
  try {
    const story = await prisma.story.findUnique({ where: { id: req.params.id } });
    if (!story) return res.status(404).json({ message: 'Story not found' });
    if (story.authorId !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });

    const { title, content, genre, tags } = req.body;
    const updated = await prisma.story.update({
      where: { id: req.params.id },
      data: { title, content, genre, tags }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete own story
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const story = await prisma.story.findUnique({ where: { id: req.params.id } });
    if (!story) return res.status(404).json({ message: 'Story not found' });
    if (story.authorId !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await prisma.story.delete({ where: { id: req.params.id } });
    res.json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all stories
router.get('/admin/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    const stories = await prisma.story.findMany({
      where,
      include: { author: { select: { username: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: moderate story (approve/reject/publish)
router.patch('/:id/moderate', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const updated = await prisma.story.update({
      where: { id: req.params.id },
      data: { status, adminNote: adminNote || null }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment to story
router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });
    const comment = await prisma.comment.create({
      data: { content, authorId: req.user.id, storyId: req.params.id },
      include: { author: { select: { username: true, avatar: true } } }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User: my stories
router.get('/user/mine', authenticate, async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      where: { authorId: req.user.id },
      include: { case: { select: { title: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
