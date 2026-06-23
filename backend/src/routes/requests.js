const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');

// User submits a request to post in the Real Life section
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, sources } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

    const request = await prisma.realCaseRequest.create({
      data: { userId: req.user.id, title, content, sources: sources || null }
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User: get my requests
router.get('/mine', authenticate, async (req, res) => {
  try {
    const requests = await prisma.realCaseRequest.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all requests
router.get('/admin/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const requests = await prisma.realCaseRequest.findMany({
      where,
      include: { user: { select: { username: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: approve or reject request
router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const updated = await prisma.realCaseRequest.update({
      where: { id: req.params.id },
      data: { status, adminNote: adminNote || null }
    });

    // If approved, auto-create a published real story
    if (status === 'approved') {
      const request = await prisma.realCaseRequest.findUnique({
        where: { id: req.params.id }
      });
      await prisma.story.create({
        data: {
          title: request.title,
          content: request.content,
          authorId: request.userId,
          type: 'real',
          status: 'published'
        }
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
