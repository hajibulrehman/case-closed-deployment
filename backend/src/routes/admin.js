const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Dashboard stats
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalCases,
      totalStories,
      pendingStories,
      pendingRequests,
      fantasyStories,
      realStories
    ] = await Promise.all([
      prisma.user.count(),
      prisma.case.count(),
      prisma.story.count(),
      prisma.story.count({ where: { status: 'pending' } }),
      prisma.realCaseRequest.count({ where: { status: 'pending' } }),
      prisma.story.count({ where: { type: 'fantasy' } }),
      prisma.story.count({ where: { type: 'real' } })
    ]);

    res.json({
      totalUsers,
      totalCases,
      totalStories,
      pendingStories,
      pendingRequests,
      fantasyStories,
      realStories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true, email: true, username: true,
        role: true, createdAt: true,
        _count: { select: { stories: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user role
router.patch('/users/:id/role', authenticate, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role))
      return res.status(400).json({ message: 'Invalid role' });
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, username: true, role: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete('/users/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
