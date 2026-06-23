const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Get theories for a case
router.get('/case/:caseId', async (req, res) => {
  try {
    const theories = await prisma.theory.findMany({
      where: { caseId: req.params.caseId, status: 'published' },
      include: { author: { select: { username: true, avatar: true } } },
      orderBy: { votes: 'desc' }
    });
    res.json(theories);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Post a theory
router.post('/', authenticate, async (req, res) => {
  try {
    const { caseId, title, content } = req.body;
    if (!caseId || !title || !content)
      return res.status(400).json({ message: 'caseId, title, and content required' });
    const theory = await prisma.theory.create({
      data: { caseId, authorId: req.user.id, title, content },
      include: { author: { select: { username: true, avatar: true } } }
    });
    res.status(201).json(theory);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Vote on a theory
router.post('/:id/vote', authenticate, async (req, res) => {
  try {
    const { direction } = req.body; // 'up' | 'down'
    const increment = direction === 'up' ? 1 : -1;
    const updated = await prisma.theory.update({
      where: { id: req.params.id },
      data: { votes: { increment } }
    });
    res.json({ votes: updated.votes });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete own theory
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const theory = await prisma.theory.findUnique({ where: { id: req.params.id } });
    if (!theory) return res.status(404).json({ message: 'Not found' });
    if (theory.authorId !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await prisma.theory.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// User's theories
router.get('/mine', authenticate, async (req, res) => {
  try {
    const theories = await prisma.theory.findMany({
      where: { authorId: req.user.id },
      include: { case: { select: { title: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(theories);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
