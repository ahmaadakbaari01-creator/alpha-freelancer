/**
 * main.js — Interactions, cursor, reveal, counter, form, tilt, marquee
 * Imports: i18n.js, scene.js
 */

import { initI18n, t } from './i18n.js';
import { initScene }   from './scene.js';

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initScene();
  initCursor();
  initNav();
  initMarquee();
  initReveal();
  initCounters();
  initTilt();
  initServiceGlow();
  initPerksCard();
  initContactForm();
  initSmoothScroll();
  initMobilePanel();
});

/* ══════════════════════════════════════
   CUSTOM CURSOR  (3 layers)
══════════════════════════════════════ */
function initCursor() {
  const dot   = document.getElementById('cur-dot');
  const ring  = document.getElementById('cur-ring');
  const trail = document.getElementById('cur-trail');
  if (!dot) return;

  let mx=0, my=0, rx=0, ry=0, tx=0, ty=0;
  let hovering = false;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.querySelectorAll('a,button,[data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => { hovering = true; });
    el.addEventListener('mouseleave', () => { hovering = false; });
  });

  (function loop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    tx += (mx - tx) * 0.07;
    ty += (my - ty) * 0.07;

    dot.style.left   = mx + 'px';  dot.style.top   = my + 'px';
    ring.style.left  = rx + 'px';  ring.style.top  = ry + 'px';
    trail.style.left = tx + 'px';  trail.style.top = ty + 'px';

    dot.classList.toggle('hover',   hovering);
    ring.classList.toggle('hover',  hovering);
    trail.classList.toggle('hover', hovering);

    requestAnimationFrame(loop);
  })();
}

/* ══════════════════════════════════════
   NAV  (scroll shrink)
══════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ══════════════════════════════════════
   MOBILE PANEL
══════════════════════════════════════ */
function initMobilePanel() {
  const panel  = document.getElementById('mobilePanel');
  const burger = document.getElementById('navBurger');
  const close  = document.getElementById('mobileClose');
  if (!panel || !burger) return;

  const open  = () => { panel.classList.add('open');  burger.setAttribute('aria-expanded','true'); };
  const shut  = () => { panel.classList.remove('open'); burger.setAttribute('aria-expanded','false'); };

  burger.addEventListener('click', open);
  close?.addEventListener('click', shut);
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
}

/* ══════════════════════════════════════
   MARQUEE  (built from JS so it's always 2x wide)
══════════════════════════════════════ */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const items = [
    'UI/UX Design','Web Development','3D Experience','WebGL & Three.js',
    'Brand Identity','React / Next.js','GSAP Animation','Motion Design',
    'Framer Motion','TypeScript','Figma','Node.js',
  ];

  const build = () => items.map(i =>
    `<span class="mq-item">${i}<span class="mq-dot" aria-hidden="true"></span></span>`
  ).join('');

  track.innerHTML = build() + build(); // duplicate for seamless loop
}

/* ══════════════════════════════════════
   SCROLL REVEAL  (IntersectionObserver)
══════════════════════════════════════ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      /* Skill bars */
      e.target.querySelectorAll('.skill-fill').forEach(b => b.classList.add('on'));
      observer.unobserve(e.target);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   COUNTER  (number count-up)
══════════════════════════════════════ */
function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('[data-count]').forEach(el => countUp(el));
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  const stats = document.querySelector('.hero-stats');
  if (stats) observer.observe(stats);
}

function countUp(el, dur = 2200) {
  const target = +el.dataset.count;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p    = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * target) + '+';
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════
   3D TILT on work cards
══════════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  });
}

/* ══════════════════════════════════════
   SERVICE CARD MOUSE GLOW
══════════════════════════════════════ */
function initServiceGlow() {
  document.querySelectorAll('.svc').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });
}

/* ══════════════════════════════════════
   PERKS CARD 3D TILT
══════════════════════════════════════ */
function initPerksCard() {
  const wrap = document.querySelector('.perks-wrap');
  const card = document.getElementById('perksCard');
  if (!wrap || !card) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 9}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  });
}

/* ══════════════════════════════════════
   CONTACT FORM  →  POST /api/contact
══════════════════════════════════════ */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const msgBox = document.getElementById('formMsg');
  const btn    = document.getElementById('formSubmit');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      name:    document.getElementById('f-name')?.value.trim()    || '',
      email:   document.getElementById('f-email')?.value.trim()   || '',
      service: document.getElementById('f-service')?.value        || '',
      budget:  document.getElementById('f-budget')?.value         || '',
      message: document.getElementById('f-msg')?.value.trim()     || '',
    };

    if (!data.name || !data.email || !data.message) {
      showMsg('error', t('form.err')); return;
    }

    btn.disabled     = true;
    btn.textContent  = t('form.sending');

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) { showMsg('success', json.message || t('form.ok')); form.reset(); }
      else          { showMsg('error',   json.error  || 'Error. Try again.'); }
    } catch {
      showMsg('success', t('form.ok'));
      form.reset();
    }

    btn.disabled    = false;
    btn.dataset.i18n = 'form.submit';
    btn.textContent  = t('form.submit');
  });

  function showMsg(type, text) {
    msgBox.className     = 'form-msg ' + type;
    msgBox.textContent   = text;
    msgBox.style.display = 'block';
    setTimeout(() => { msgBox.style.display = 'none'; }, 6000);
  }
}

/* ══════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}
