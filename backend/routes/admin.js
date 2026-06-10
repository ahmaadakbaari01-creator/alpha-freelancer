/**
 * routes/admin.js  — Protected admin endpoints
 * All routes require x-admin-key header.
 *
 * GET  /api/admin/contacts          — All messages
 * GET  /api/admin/contacts/unread   — Unread count
 * PATCH /api/admin/contacts/:id/read
 * DELETE /api/admin/contacts/:id
 */
const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const { requireAdmin } = require('../middleware/auth');
const router       = express.Router();

const DATA = path.join(__dirname, '../data/contacts.json');
const read  = () => { try { return JSON.parse(fs.readFileSync(DATA,'utf8')); } catch { return []; } };
const write = arr => fs.writeFileSync(DATA, JSON.stringify(arr,null,2),'utf8');

router.use(requireAdmin);

router.get('/contacts',        (_req, res) => res.json({ ok: true, contacts: read() }));
router.get('/contacts/unread', (_req, res) => res.json({ ok: true, count: read().filter(c=>!c.read).length }));

router.patch('/contacts/:id/read', (req, res) => {
  const all = read();
  const c   = all.find(x => String(x.id) === req.params.id);
  if (!c) return res.status(404).json({ ok: false });
  c.read = true; write(all);
  res.json({ ok: true });
});

router.delete('/contacts/:id', (req, res) => {
  let all = read();
  const len = all.length;
  all = all.filter(x => String(x.id) !== req.params.id);
  if (all.length === len) return res.status(404).json({ ok: false });
  write(all);
  res.json({ ok: true });
});

module.exports = router;
