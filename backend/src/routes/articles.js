const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Get all published articles (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = { status: 'published' };
    if (category && category !== 'all') where.category = category;
    if (featured) where.featured = true;
    if (search) where.OR = [
      { title: { contains: search } },
      { summary: { contains: search } }
    ];
    const [articles, total] = await Promise.all([
      prisma.article.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: parseInt(limit) }),
      prisma.article.count({ where })
    ]);
    res.json({ articles, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get single article
router.get('/:slug', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({ where: { slug: req.params.slug } });
    if (!article || article.status !== 'published') return res.status(404).json({ message: 'Not found' });
    await prisma.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } });
    res.json(article);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: get all articles
router.get('/admin/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(articles);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: create
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, slug, summary, content, category, coverImage, tags, featured, status, relatedCases } = req.body;
    if (!title || !slug || !summary || !content || !category)
      return res.status(400).json({ message: 'Required fields missing' });
    const article = await prisma.article.create({
      data: { title, slug, summary, content, category, coverImage: coverImage || null,
        tags: tags || null, featured: !!featured, status: status || 'published',
        relatedCases: relatedCases || null }
    });
    res.status(201).json(article);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: update
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updated = await prisma.article.update({ where: { id: req.params.id }, data: req.body });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: delete
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
