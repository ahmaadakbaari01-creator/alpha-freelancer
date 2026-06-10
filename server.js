/**
 * Alpha Agency — Backend Server
 * Node.js + Express  |  Port 4444
 * ──────────────────────────────
 * Routes:
 *   GET  /               → serves index.html
 *   POST /api/contact    → saves message to contacts.json
 *   GET  /api/projects   → returns portfolio data
 *   GET  /api/stats      → returns agency stats
 *   GET  /api/contacts   → admin: list all messages (protected)
 */

const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const cors     = require('cors');

const app  = express();
const PORT = 4444;
const DATA = path.join(__dirname, 'contacts.json');
const ADMIN_KEY = 'alpha-secret-2026'; // change in production

/* ── Middleware ── */
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* ── Helper: read/write contacts ── */
function readContacts() {
  try { return JSON.parse(fs.readFileSync(DATA, 'utf8')); }
  catch { return []; }
}
function writeContacts(arr) {
  fs.writeFileSync(DATA, JSON.stringify(arr, null, 2), 'utf8');
}

/* ══════════════════════════════
   POST /api/contact
   Body: { name, email, service, budget, message }
══════════════════════════════ */
app.post('/api/contact', (req, res) => {
  const { name, email, service, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'لطفاً همه فیلدها را پر کنید.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'ایمیل معتبر وارد کنید.' });
  }
  const entry = {
    id:      Date.now(),
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    service: service || '—',
    budget:  budget  || '—',
    message: message.trim(),
    date:    new Date().toISOString(),
    read:    false,
  };
  const contacts = readContacts();
  contacts.unshift(entry);
  writeContacts(contacts);
  console.log(`[contact] ${entry.name} <${entry.email}>`);
  res.json({ ok: true, message: 'پیام شما دریافت شد! به زودی باهاتون تماس می‌گیریم.' });
});

/* ══════════════════════════════
   GET /api/projects
══════════════════════════════ */
app.get('/api/projects', (_req, res) => {
  res.json({
    ok: true,
    projects: [
      {
        id: 1, slug: 'nexus',
        title: 'Nexus Dashboard',
        category: 'SaaS Platform',
        desc: 'داشبورد آنالیتیکس با هوش مصنوعی، داده‌های لحظه‌ای و رابط کاربری تاریک.',
        tech: ['Next.js', 'Supabase', 'Three.js'],
        color: ['#1e1b4b', '#4338ca'],
        featured: true,
      },
      {
        id: 2, slug: 'bloom',
        title: 'Bloom Store',
        category: 'E-Commerce',
        desc: 'فروشگاه لاکچری با پیش‌نمایش سه‌بعدی محصول و چک‌اوت شیشه‌ای.',
        tech: ['React', 'Shopify', 'GSAP'],
        color: ['#064e3b', '#047857'],
        featured: false,
      },
      {
        id: 3, slug: 'aura',
        title: 'Aura Meditation',
        category: 'Mobile App',
        desc: 'اپ موبایل ولنس با انیمیشن‌های محیطی و طراحی بهینه AMOLED.',
        tech: ['React Native', 'Reanimated'],
        color: ['#4c1d95', '#7c3aed'],
        featured: false,
      },
      {
        id: 4, slug: 'forge',
        title: 'Forge Agency',
        category: 'Landing Page',
        desc: 'لندینگ‌پیج آژانس با اسکرول‌انیمیشن GSAP و سین WebGL.',
        tech: ['HTML', 'GSAP', 'WebGL'],
        color: ['#7c2d12', '#c2410c'],
        featured: false,
      },
      {
        id: 5, slug: 'orbit',
        title: 'Orbit Finance',
        category: 'FinTech',
        desc: 'اپلیکیشن مالی با نمودارهای تعاملی و داشبورد پورتفولیو.',
        tech: ['Vue 3', 'D3.js', 'Node.js'],
        color: ['#0c4a6e', '#0284c7'],
        featured: false,
      },
    ],
  });
});

/* ══════════════════════════════
   GET /api/stats
══════════════════════════════ */
app.get('/api/stats', (_req, res) => {
  res.json({
    ok: true,
    stats: {
      projects:     47,
      clients:      32,
      years:         5,
      satisfaction: 100,
    },
  });
});

/* ══════════════════════════════
   GET /api/contacts  (admin)
   Header: x-admin-key: <ADMIN_KEY>
══════════════════════════════ */
app.get('/api/contacts', (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  res.json({ ok: true, contacts: readContacts() });
});

/* ── 404 ── */
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`\n  ╔═══════════════════════════════╗`);
  console.log(`  ║   α  ALPHA AGENCY SERVER      ║`);
  console.log(`  ║   http://localhost:${PORT}       ║`);
  console.log(`  ╚═══════════════════════════════╝\n`);
});
