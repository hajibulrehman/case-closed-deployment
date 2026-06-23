const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Get all quizzes (public)
router.get('/', async (req, res) => {
  try {
    const { difficulty, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = { status: 'published' };
    if (difficulty && difficulty !== 'all') where.difficulty = difficulty;
    const [quizzes, total] = await Promise.all([
      prisma.quiz.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: parseInt(limit) }),
      prisma.quiz.count({ where })
    ]);
    // Strip answers from questions before sending to client
    const safe = quizzes.map(q => ({
      ...q,
      questions: JSON.parse(q.questions || '[]').map(({ question, options, explanation }) =>
        ({ question, options, explanation }))
    }));
    res.json({ quizzes: safe, total, pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get single quiz (public) — includes correct answers after submit
router.get('/:id', async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
    if (!quiz) return res.status(404).json({ message: 'Not found' });
    const questions = JSON.parse(quiz.questions || '[]').map(({ question, options, explanation }) =>
      ({ question, options, explanation }));
    res.json({ ...quiz, questions });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Submit quiz answers — returns score and correct answers
router.post('/:id/submit', async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
    if (!quiz) return res.status(404).json({ message: 'Not found' });
    const questions = JSON.parse(quiz.questions || '[]');
    const { answers } = req.body; // array of selected option indices
    let score = 0;
    const results = questions.map((q, i) => {
      const correct = q.answer;
      const selected = answers?.[i] ?? null;
      const isCorrect = selected === correct;
      if (isCorrect) score++;
      return { question: q.question, options: q.options, selected, correct, isCorrect, explanation: q.explanation };
    });
    await prisma.quiz.update({ where: { id: req.params.id }, data: { plays: { increment: 1 } } });
    res.json({ score, total: questions.length, percent: Math.round((score / questions.length) * 100), results });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: CRUD
router.get('/admin/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(quizzes);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, caseId, difficulty, questions, coverImage, status } = req.body;
    if (!title || !questions) return res.status(400).json({ message: 'Required fields missing' });
    const quiz = await prisma.quiz.create({
      data: { title, description, caseId: caseId || null, difficulty: difficulty || 'medium',
        questions: JSON.stringify(questions), coverImage: coverImage || null, status: status || 'published' }
    });
    res.status(201).json(quiz);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.questions) data.questions = JSON.stringify(data.questions);
    const updated = await prisma.quiz.update({ where: { id: req.params.id }, data });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.quiz.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
