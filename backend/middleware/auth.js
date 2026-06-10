/**
 * auth.js — Admin key middleware
 * Usage: router.use(requireAdmin)
 */
const ADMIN_KEY = process.env.ADMIN_KEY || 'alpha-admin-2026';

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  next();
}

module.exports = { requireAdmin };
