/**
 * routes/contact.js
 * POST /api/contact  — Save message
 * GET  /api/contact  — List all (admin protected, see admin.js)
 */
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router  = express.Router();

const DATA = path.join(__dirname, '../data/contacts.json');

function read()       { try { return JSON.parse(fs.readFileSync(DATA, 'utf8')); } catch { return []; } }
function write(arr)   { fs.writeFileSync(DATA, JSON.stringify(arr, null, 2), 'utf8'); }

/* ── POST /api/contact ── */
router.post('/', (req, res) => {
  const { name, email, service, budget, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ ok: false, error: 'لطفاً نام، ایمیل و پیام رو پر کن.' });
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

  const contacts = read();
  contacts.unshift(entry);
  write(contacts);

  console.log(`[contact] ${entry.name} <${entry.email}>`);
  res.json({ ok: true, message: 'پیام شما دریافت شد! به زودی باهاتون تماس می‌گیریم. ✓' });
});

/* ── GET /api/contact/:id/read ── */
router.patch('/:id/read', (req, res) => {
  const contacts = read();
  const item     = contacts.find(c => String(c.id) === req.params.id);
  if (!item) return res.status(404).json({ ok: false, error: 'Not found' });
  item.read = true;
  write(contacts);
  res.json({ ok: true });
});

/* ── DELETE /api/contact/:id ── */
router.delete('/:id', (req, res) => {
  let contacts = read();
  const before = contacts.length;
  contacts = contacts.filter(c => String(c.id) !== req.params.id);
  if (contacts.length === before) return res.status(404).json({ ok: false, error: 'Not found' });
  write(contacts);
  res.json({ ok: true });
});

module.exports = router;
