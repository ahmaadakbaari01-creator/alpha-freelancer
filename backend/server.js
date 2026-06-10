/**
 * Alpha Agency — Backend Server  v2.0
 * ─────────────────────────────────────
 * node server.js        → production
 * nodemon server.js     → development
 *
 * Routes:
 *   GET  /                        → frontend/index.html
 *   POST /api/contact             → save message
 *   GET  /api/projects            → portfolio data
 *   GET  /api/projects/:slug      → single project
 *   GET  /api/stats               → agency stats
 *   GET  /api/admin/contacts      → admin (x-admin-key required)
 *   PATCH/DELETE /api/admin/...   → admin actions
 *   GET  /admin                   → admin panel HTML
 */

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');

const app  = express();
const PORT = process.env.PORT || 4444;

/* ── Ensure data dir exists ── */
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]', 'utf8');

/* ── Middleware ── */
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

/* ── Static: frontend ── */
app.use(express.static(path.join(__dirname, '../frontend')));

/* ── Static: admin panel ── */
app.use('/admin', express.static(path.join(__dirname, '../admin')));

/* ── API Routes ── */
const contactRouter  = require('./routes/contact');
const projectsRouter = require('./routes/projects');
const adminRouter    = require('./routes/admin');

app.use('/api/contact',  contactRouter);
app.use('/api/projects', projectsRouter);
app.get('/api/stats',    (_req, res) => res.json({ ok: true, stats: { projects: 47, clients: 32, years: 5, satisfaction: 100 } }));
app.use('/api/admin',    adminRouter);

/* ── SPA fallback ── */
app.get('*', (req, res) => {
  if (req.path.startsWith('/admin')) {
    return res.sendFile(path.join(__dirname, '../admin/index.html'));
  }
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/* ── Start ── */
app.listen(PORT, () => {
  console.log('\n  ╔════════════════════════════════════╗');
  console.log(`  ║   α  ALPHA AGENCY  v2.0            ║`);
  console.log(`  ║   http://localhost:${PORT}            ║`);
  console.log(`  ║   /admin  — Admin Panel            ║`);
  console.log('  ╚════════════════════════════════════╝\n');
});
