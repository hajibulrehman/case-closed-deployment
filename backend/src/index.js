require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes    = require('./routes/auth');
const caseRoutes    = require('./routes/cases');
const storyRoutes   = require('./routes/stories');
const requestRoutes = require('./routes/requests');
const adminRoutes   = require('./routes/admin');
const articleRoutes = require('./routes/articles');
const quizRoutes    = require('./routes/quizzes');
const theoryRoutes  = require('./routes/theories');

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
// In production the frontend is served from the same origin, so same-origin
// requests have no Origin header and pass through automatically.
// Only needed for local dev (frontend on :5173, backend on :5000).
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // No origin = same-origin request or non-browser client — always allow
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // In production, same-origin requests won't have a cross-origin header,
    // so if we see the app's own domain just allow it
    if (process.env.RENDER_EXTERNAL_URL && origin === process.env.RENDER_EXTERNAL_URL) {
      return callback(null, true);
    }
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static uploads ────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Serve React frontend build (BEFORE API routes so assets resolve first) ───
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendDist));
}

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/theories', theoryRoutes);

// ── Image proxy ───────────────────────────────────────────────────────────────
const fetch = require('node-fetch');
app.get('/api/imgproxy', async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') return res.status(400).send('Missing url');
  const allowed = ['images.unsplash.com', 'picsum.photos', 'fastly.picsum.photos'];
  try {
    const parsed = new URL(url);
    if (!allowed.some(d => parsed.hostname.endsWith(d))) {
      return res.status(403).send('Domain not allowed');
    }
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'CaseClosed/1.0', 'Referer': 'https://unsplash.com/' }
    });
    if (!upstream.ok) return res.status(upstream.status).send('Upstream error');
    res.set('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=86400');
    upstream.body.pipe(res);
  } catch (err) {
    res.status(500).send('Proxy error');
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── React catch-all (AFTER all API routes) ────────────────────────────────────
// Sends unknown paths to index.html so React Router handles client-side navigation
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../frontend/dist');
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
