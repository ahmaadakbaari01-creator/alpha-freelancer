/**
 * routes/projects.js
 * GET /api/projects   — All projects
 * GET /api/projects/:slug — Single project
 * GET /api/stats      — Agency statistics
 */
const express  = require('express');
const router   = express.Router();

const PROJECTS = [
  {
    id: 1, slug: 'nexus', featured: true,
    title: { fa: 'Nexus Dashboard', en: 'Nexus Dashboard' },
    category: 'SaaS Platform',
    desc: {
      fa: 'داشبورد آنالیتیکس با هوش مصنوعی، داده‌های لحظه‌ای و رابط کاربری تاریک.',
      en: 'AI analytics dashboard with real-time data and a beautiful dark UI built in Next.js + Supabase.',
    },
    tech: ['Next.js', 'Supabase', 'Three.js', 'TypeScript'],
    color: ['#1e1b4b', '#4338ca'],
  },
  {
    id: 2, slug: 'bloom', featured: false,
    title: { fa: 'Bloom Store', en: 'Bloom Store' },
    category: 'E-Commerce',
    desc: {
      fa: 'فروشگاه لاکچری با پیش‌نمایش ۳D محصول و checkout شیشه‌ای.',
      en: 'Luxury e-commerce with 3D product previews and glassmorphism checkout flow.',
    },
    tech: ['React', 'Shopify', 'GSAP'],
    color: ['#064e3b', '#047857'],
  },
  {
    id: 3, slug: 'aura', featured: false,
    title: { fa: 'Aura Meditation', en: 'Aura Meditation' },
    category: 'Mobile App',
    desc: {
      fa: 'اپ موبایل ولنس با انیمیشن‌های محیطی و طراحی بهینه AMOLED.',
      en: 'Wellness mobile app with ambient animations and AMOLED-optimized design.',
    },
    tech: ['React Native', 'Reanimated'],
    color: ['#4c1d95', '#7c3aed'],
  },
  {
    id: 4, slug: 'forge', featured: false,
    title: { fa: 'Forge Agency', en: 'Forge Agency' },
    category: 'Landing Page',
    desc: {
      fa: 'لندینگ‌پیج با scroll-driven GSAP و سین WebGL.',
      en: 'Agency landing page with GSAP scroll-driven animations and WebGL hero scene.',
    },
    tech: ['HTML', 'GSAP', 'WebGL'],
    color: ['#7c2d12', '#c2410c'],
  },
  {
    id: 5, slug: 'orbit', featured: false,
    title: { fa: 'Orbit Finance', en: 'Orbit Finance' },
    category: 'FinTech',
    desc: {
      fa: 'اپ مالی با نمودارهای تعاملی D3.js و داشبورد پورتفولیو.',
      en: 'Financial app with interactive D3.js charts and portfolio dashboard.',
    },
    tech: ['Vue 3', 'D3.js', 'Node.js'],
    color: ['#0c4a6e', '#0284c7'],
  },
  {
    id: 6, slug: 'nova', featured: false,
    title: { fa: 'Nova Brand', en: 'Nova Brand' },
    category: 'Brand Identity',
    desc: {
      fa: 'هویت بصری کامل با لوگوموشن، سیستم رنگ و brandbook.',
      en: 'Complete visual identity with logo motion, color system, and brandbook.',
    },
    tech: ['Figma', 'After Effects'],
    color: ['#1f2937', '#374151'],
  },
];

const STATS = { projects: 47, clients: 32, years: 5, satisfaction: 100 };

router.get('/stats', (_req, res) => res.json({ ok: true, stats: STATS }));
router.get('/',      (_req, res) => res.json({ ok: true, projects: PROJECTS }));
router.get('/:slug', (req, res) => {
  const p = PROJECTS.find(x => x.slug === req.params.slug);
  if (!p) return res.status(404).json({ ok: false, error: 'Not found' });
  res.json({ ok: true, project: p });
});

module.exports = router;
