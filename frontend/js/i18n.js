/**
 * i18n.js — Bilingual FA / EN system for Alpha Agency
 * Applies text, direction, and font-family on toggle.
 */

const TRANSLATIONS = {
  fa: {
    /* NAV */
    "nav.services":  "خدمات",
    "nav.work":      "پروژه‌ها",
    "nav.process":   "فرآیند",
    "nav.skills":    "مهارت‌ها",
    "nav.testi":     "نظرات",
    "nav.cta":       "شروع پروژه ←",

    /* HERO */
    "hero.badge":    "آژانس طراحی وب ۳D — آنلاین و آماده",
    "hero.line1":    "آینده دیجیتال",
    "hero.line2":    "شما از اینجاست",
    "hero.sub":      "ما تجربه‌های وب سه‌بعدی می‌سازیم که مرز بین واقعیت و تخیل رو محو می‌کنن.\nاز طراحی UI تا انیمیشن فضایی — هر پیکسل، یه داستانه.",
    "hero.cta1":     "نمونه کارها",
    "hero.cta2":     "تماس بگیر",
    "hero.stat1":    "پروژه تحویل‌داده‌شده",
    "hero.stat2":    "مشتری راضی",
    "hero.stat3":    "سال تجربه",
    "hero.stat4":    "٪ رضایت",
    "hero.scroll":   "اسکرول کن",

    /* SECTIONS */
    "sec.services":  "خدمات ما",
    "sec.work":      "پورتفولیو",
    "sec.process":   "فرآیند کار",
    "sec.skills":    "مهارت‌ها",
    "sec.testi":     "نظرات مشتریان",
    "sec.contact":   "بریم شروع کنیم",

    /* SERVICES */
    "services.title": "هر چیزی که\nبرندت نیاز داره",
    "services.sub":   "از ایده تا لانچ — طراحی، توسعه، انیمیشن و هویت بصری زیر یه سقف.",
    "svc1.title": "طراحی UI/UX",
    "svc1.desc":  "رابط کاربری بی‌نظیر با تحقیق عمیق از کاربر، پروتوتایپ تعاملی و تست قابلیت استفاده.",
    "svc2.title": "توسعه فرانت‌اند",
    "svc2.desc":  "اپ‌های React و Next.js سریع، SEO-ready و با کد تمیز. عملکرد عالی در هر دستگاه.",
    "svc3.title": "تجربه ۳D / WebGL",
    "svc3.desc":  "سین‌های immersive با Three.js، انیمیشن‌های GSAP و جلوه‌های فضایی که اسکرول رو متوقف می‌کنن.",
    "svc4.title": "هویت بصری",
    "svc4.desc":  "لوگو، سیستم طراحی و راهنمای برند که کسب‌وکارت رو فراموش‌نشدنی می‌کنه.",
    "svc5.title": "موشن دیزاین",
    "svc5.desc":  "انیمیشن‌های مایکروینتراکشن، scroll-driven effects و تانزیشن‌های روان که UX رو بالا می‌برن.",
    "svc6.title": "لندینگ‌پیج پریمیوم",
    "svc6.desc":  "صفحه‌های فرود با نرخ تبدیل بالا — طراحی، کپی و انیمیشن همه با هم بهینه می‌شن.",

    /* WORK */
    "work.title":    "نمونه کارهای منتخب",
    "work.all":      "همه پروژه‌ها ←",
    "work.view":     "مشاهده پروژه",
    "work.featured": "مشاهده کیس استادی",

    /* PROCESS */
    "process.title": "از ایده تا لانچ\nدر ۴ مرحله",
    "proc1.num": "۰۱ — کشف",   "proc1.title": "تحقیق و استراتژی",   "proc1.desc": "هدف‌ها، مخاطب و رقبا رو بررسی می‌کنیم. یه نقشه راه دقیق می‌سازیم.",
    "proc2.num": "۰۲ — طراحی", "proc2.title": "وایرفریم و پروتوتایپ","proc2.desc": "طراحی در Figma، تایپوگرافی، رنگ‌بندی و تجربه کاربری کامل.",
    "proc3.num": "۰۳ — ساخت",  "proc3.title": "توسعه و انیمیشن",    "proc3.desc": "کدنویسی تمیز، Three.js، GSAP و تست عملکرد در تمام مرورگرها.",
    "proc4.num": "۰۴ — لانچ",  "proc4.title": "تحویل و پشتیبانی",   "proc4.desc": "دپلوی، بهینه‌سازی SEO و ۳۰ روز پشتیبانی رایگان پس از تحویل.",

    /* SKILLS */
    "skills.title": "ابزارهای ما",
    "skills.sub":   "سال‌ها تسلط روی طراحی و مهندسی — از پیکسل تا سرور.",
    "perk1.title": "تحویل سریع",         "perk1.desc": "میانگین ۲–۳ هفته برای هر پروژه",
    "perk2.title": "پیکسل‌پرفکت",        "perk2.desc": "هر جزئیات دقیقاً طبق دیزاین",
    "perk3.title": "ارتباط شفاف",        "perk3.desc": "آپدیت روزانه و فرآیند کاملاً باز",
    "perk4.title": "کیفیت کد",           "perk4.desc": "کد تمیز، مستند و مقیاس‌پذیر",
    "perk5.title": "پشتیبانی پس از لانچ","perk5.desc": "۳۰ روز پشتیبانی رایگان",

    /* TESTIMONIALS */
    "testi.title": "اونا چی می‌گن",
    "t1.text": "«انیمیشن‌های ۳D کاملاً صفحه لندینگ ما رو متحول کرد. ترافیک ۳۴۰٪ بالا رفت از لانچ.»",
    "t1.name": "سارا کریمی", "t1.role": "CEO, NovaTech",
    "t2.text": "«سریع، حرفه‌ای و استثنایی. سیستم طراحی که ساخت از MVP تا Enterprise بدون هیچ rewrite ای رشد کرد.»",
    "t2.name": "مارکوس لوپز", "t2.role": "CTO, FinEdge Labs",
    "t3.text": "«برای ریبرند کامل + سایت استخدام کردیم. ویژن ما رو فوری فهمید و به چیزی تبدیل کرد که حتی تصورشو نمی‌کردیم.»",
    "t3.name": "زارا اوکافور", "t3.role": "Founder, Luminary Studio",

    /* CONTACT */
    "contact.title": "یه پروژه در ذهن داری؟",
    "contact.sub":   "آماده‌ایم تجربه دیجیتال بعدیت رو بسازیم. اینجا بنویس یا مستقیم ایمیل بزن.",
    "form.name":     "نام شما",
    "form.email":    "ایمیل",
    "form.service":  "نوع خدمت",
    "form.budget":   "بودجه تقریبی",
    "form.message":  "پیام",
    "form.submit":   "ارسال پیام",
    "form.ph.name":  "احمد اکبری",
    "form.ph.msg":   "پروژه‌ات رو برام توضیح بده...",
    "form.opt.svc0": "انتخاب کن...",
    "form.opt.svc1": "طراحی UI/UX",
    "form.opt.svc2": "توسعه وب",
    "form.opt.svc3": "تجربه ۳D / WebGL",
    "form.opt.svc4": "هویت بصری",
    "form.opt.svc5": "لندینگ‌پیج",
    "form.opt.svc6": "دیگر",
    "form.opt.b0":   "انتخاب کن...",
    "form.opt.b1":   "کمتر از $1,000",
    "form.opt.b2":   "$1,000 – $3,000",
    "form.opt.b3":   "$3,000 – $8,000",
    "form.opt.b4":   "بیشتر از $8,000",
    "form.err":      "لطفاً نام، ایمیل و پیام رو پر کن.",
    "form.sending":  "در حال ارسال...",
    "form.ok":       "پیام ارسال شد! به زودی باهاتون تماس می‌گیریم. ✓",

    /* FOOTER */
    "footer.copy":   "© ۲۰۲۶ آلفا. تمام حقوق محفوظ است.",
    "footer.built":  "Built with Three.js + Pure CSS",
  },

  en: {
    /* NAV */
    "nav.services":  "Services",
    "nav.work":      "Work",
    "nav.process":   "Process",
    "nav.skills":    "Skills",
    "nav.testi":     "Reviews",
    "nav.cta":       "Start a Project →",

    /* HERO */
    "hero.badge":  "3D Web Design Agency — Online & Ready",
    "hero.line1":  "Your Digital Future",
    "hero.line2":  "Starts Here",
    "hero.sub":    "We craft immersive 3D web experiences that blur the line between reality and imagination.\nFrom UI design to space-grade animation — every pixel tells a story.",
    "hero.cta1":   "View Work",
    "hero.cta2":   "Get in Touch",
    "hero.stat1":  "Projects Delivered",
    "hero.stat2":  "Happy Clients",
    "hero.stat3":  "Years Experience",
    "hero.stat4":  "% Satisfaction",
    "hero.scroll": "Scroll",

    /* SECTIONS */
    "sec.services":  "What We Do",
    "sec.work":      "Portfolio",
    "sec.process":   "Our Process",
    "sec.skills":    "Expertise",
    "sec.testi":     "Client Reviews",
    "sec.contact":   "Let's Build Together",

    /* SERVICES */
    "services.title": "Everything Your\nBrand Needs",
    "services.sub":   "From idea to launch — design, development, animation, and brand identity under one roof.",
    "svc1.title": "UI/UX Design",
    "svc1.desc":  "Pixel-perfect interfaces with deep user research, interactive prototyping, and usability testing.",
    "svc2.title": "Frontend Development",
    "svc2.desc":  "Fast React & Next.js apps, SEO-ready, clean code. Outstanding performance on every device.",
    "svc3.title": "3D / WebGL Experience",
    "svc3.desc":  "Immersive Three.js scenes, GSAP animations, and space-grade effects that stop the scroll.",
    "svc4.title": "Brand Identity",
    "svc4.desc":  "Logos, design systems, and brand guidelines that make your business unforgettable.",
    "svc5.title": "Motion Design",
    "svc5.desc":  "Micro-interaction animations, scroll-driven effects, and smooth transitions that elevate UX.",
    "svc6.title": "Premium Landing Pages",
    "svc6.desc":  "High-converting landing pages — design, copy, and animation all optimized together.",

    /* WORK */
    "work.title":    "Selected Work",
    "work.all":      "All Projects →",
    "work.view":     "View Project",
    "work.featured": "View Case Study",

    /* PROCESS */
    "process.title": "From Idea to Launch\nin 4 Steps",
    "proc1.num": "01 — Discover", "proc1.title": "Research & Strategy",   "proc1.desc": "We analyze goals, audience, and competitors to build a precise roadmap.",
    "proc2.num": "02 — Design",   "proc2.title": "Wireframe & Prototype", "proc2.desc": "Figma design, typography, color system, and full UX architecture.",
    "proc3.num": "03 — Build",    "proc3.title": "Dev & Animation",       "proc3.desc": "Clean code, Three.js, GSAP, and cross-browser performance testing.",
    "proc4.num": "04 — Launch",   "proc4.title": "Delivery & Support",    "proc4.desc": "Deploy, SEO optimization, and 30 days of free post-launch support.",

    /* SKILLS */
    "skills.title": "Our Toolkit",
    "skills.sub":   "Years of mastery across design and engineering disciplines — from pixel to server.",
    "perk1.title": "Fast Delivery",         "perk1.desc": "Average 2–3 week turnaround per project",
    "perk2.title": "Pixel Perfect",         "perk2.desc": "Every detail matches the design spec",
    "perk3.title": "Clear Communication",   "perk3.desc": "Daily updates, transparent process",
    "perk4.title": "Code Quality",          "perk4.desc": "Clean, documented, scalable code",
    "perk5.title": "Post-Launch Support",   "perk5.desc": "30 days free support after delivery",

    /* TESTIMONIALS */
    "testi.title": "What Clients Say",
    "t1.text": '"The 3D animations completely transformed our landing page. Traffic is up 340% since launch."',
    "t1.name": "Sarah K.", "t1.role": "CEO, NovaTech",
    "t2.text": '"Fast, professional, and incredibly talented. The design system scaled from MVP to enterprise without a single rewrite."',
    "t2.name": "Marcus L.", "t2.role": "CTO, FinEdge Labs",
    "t3.text": '"Hired for a complete rebrand + website. Understood our vision immediately and delivered beyond imagination."',
    "t3.name": "Zara O.", "t3.role": "Founder, Luminary Studio",

    /* CONTACT */
    "contact.title": "Got a Project in Mind?",
    "contact.sub":   "We're ready to build your next digital experience. Write here or send us an email directly.",
    "form.name":    "Your Name",
    "form.email":   "Email",
    "form.service": "Service Type",
    "form.budget":  "Approximate Budget",
    "form.message": "Message",
    "form.submit":  "Send Message",
    "form.ph.name": "Ahmad Akbari",
    "form.ph.msg":  "Tell us about your project — goals, timeline, and anything important...",
    "form.opt.svc0": "Select...",
    "form.opt.svc1": "UI/UX Design",
    "form.opt.svc2": "Web Development",
    "form.opt.svc3": "3D / WebGL Experience",
    "form.opt.svc4": "Brand Identity",
    "form.opt.svc5": "Landing Page",
    "form.opt.svc6": "Other",
    "form.opt.b0":   "Select...",
    "form.opt.b1":   "Under $1,000",
    "form.opt.b2":   "$1,000 – $3,000",
    "form.opt.b3":   "$3,000 – $8,000",
    "form.opt.b4":   "Over $8,000",
    "form.err":      "Please fill in name, email, and message.",
    "form.sending":  "Sending...",
    "form.ok":       "Message sent! We'll be in touch soon. ✓",

    /* FOOTER */
    "footer.copy":  "© 2026 Alpha. All rights reserved.",
    "footer.built": "Built with Three.js + Pure CSS",
  }
};

/* ── Current lang ── */
let currentLang = localStorage.getItem('alpha-lang') || 'fa';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('alpha-lang', lang);

  const isFA = lang === 'fa';
  document.documentElement.lang = lang;
  document.body.dir  = isFA ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', !isFA);

  /* Text nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[lang][key];
    if (val !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.tagName === 'OPTION') {
        el.textContent = val;
      } else {
        el.innerHTML = val.replace(/\n/g, '<br>');
      }
    }
  });

  /* Lang toggle buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function initI18n() {
  /* Wire lang buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
  applyLang(currentLang);
}

function t(key) {
  return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS['fa'][key] ?? key;
}

export { initI18n, applyLang, t, currentLang, TRANSLATIONS };
