"use strict";

/* ── Year ─────────────────────────────────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Toast ────────────────────────────────────────────────── */
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

/* ── Theme ────────────────────────────────────────────────── */
const STORAGE_THEME = "ab-theme";
const root = document.documentElement;
const themeColorMeta = document.getElementById("themeColor");

const THEME_META = {
  dark:  "#0c111c",
  light: "#faf8f4"
};

function applyTheme(theme, save = true) {
  root.setAttribute("data-theme", theme);
  if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_META[theme]);
  if (save) localStorage.setItem(STORAGE_THEME, theme);

  // Update aria-labels on all toggle buttons
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}

function toggleTheme() {
  const current = root.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
}

// Load saved preference, fallback to dark
const savedTheme = localStorage.getItem(STORAGE_THEME);
applyTheme(savedTheme === "light" ? "light" : "dark", false);

document.getElementById("themeToggle")      ?.addEventListener("click", toggleTheme);
document.getElementById("themeToggleMobile")?.addEventListener("click", toggleTheme);

/* ── i18n ─────────────────────────────────────────────────── */
const FORMSPREE   = "https://formspree.io/f/mvzbyjdk";
const STORAGE_LANG = "ab-lang";
let currentLang = localStorage.getItem(STORAGE_LANG) === "ar" ? "ar" : "en";

const dict = {
  ar: {
    dir: "rtl", lang: "ar", toggle: "English",
    "brand.sub":        "بورتفوليو",
    "nav.home":         "الرئيسية",
    "nav.highlights":   "نبذة",
    "nav.work":         "مشاريعي",
    "nav.contact":      "تواصل",
    "nav.cv":           "CV",
    "hero.eyebrow":     "Data · Execution · Impact",
    "hero.title":       "عبدالله العمران",
    "hero.subtitle":    "طالب علوم حاسب عملت في بيئات تتطلب وضوحًا وسرعة في القرار. كنت دائمًا أبحث عن الصورة الكاملة — ما الهدف، أين الفجوة، كيف نقيس النتيجة. في علم البيانات وجدت المجال الذي يُجيب على هذه الأسئلة.",
    "hero.cta1":        "أعمالي",
    "hero.cta2":        "تواصل معي",
    "hero.copy":        "نسخ البريد",
    "hero.badge":       "تحليل البيانات",
    "hero.cardTitle":   "باختصار",
    "hero.cardTag":     "واضح · عملي · منضبط",
    "hero.line1k":      "اهتمامي",
    "hero.line1v":      "Analytics → Data Science",
    "hero.line2k":      "أسلوبي",
    "hero.line2v":      "تقارير مبنية على أهداف",
    "hero.line3k":      "تجدني",
    "hero.cv":          "تحميل CV",
    "hero.more":        "نبذة ←",
    "hl.title":         "نبذة عني",
    "hl.desc":          "طريقتي في العمل، في ثلاث نقاط.",
    "hl.c1t":           "الهدف أولاً",
    "hl.c1d":           "لا أبدأ بالبيانات، أبدأ بالسؤال. أيّ قرار يخدمه هذا التحليل؟ ذلك هو ما يُشكّل كل خطوة بعده.",
    "hl.c2t":           "عمل منظّم وواضح",
    "hl.c2d":           "ملفات مرتّبة، استعلامات موثّقة، وخطوات قابلة للمراجعة. أبني ما يستطيع غيري قراءته وفهمه.",
    "hl.c3t":           "نتيجة قابلة للعرض",
    "hl.c3d":           "كل مشروع ينتهي بشيء ملموس — لوحة بيانات، أو دفتر تحليل، أو سكريبت يعمل فعلاً. ليس مجرد وصف.",
    "work.title":       "مشاريعي",
    "work.desc":        "ثلاثة مشاريع قيد الإعداد — التفاصيل الكاملة قريبًا.",
    "work.p1t":         "Executive Dashboard",
    "work.p1d":         "لوحة مؤشرات أداء مصمّمة لصانع القرار، تُقدّم الأرقام المهمة دون تعقيد.",
    "work.p2t":         "SQL Analytics Pack",
    "work.p2d":         "مجموعة استعلامات حقيقية — تجميعات، CTEs، ودوال نافذة على بيانات فعلية.",
    "work.p3t":         "Data Cleaning Pipeline",
    "work.p3d":         "أتمتة فحص جودة البيانات وتصديرها جاهزةً للتقارير الأسبوعية.",
    "work.soon":        "قريبًا",
    "work.repo":        "المستودع",
    "work.demo":        "معاينة",
    "contact.title":    "تواصل معي",
    "contact.desc":     "هل لديك سؤال أو فكرة للتعاون؟ أرسل رسالتك وسأردّ في أقرب وقت.",
    "contact.name":     "الاسم",
    "contact.email":    "البريد الإلكتروني",
    "contact.msg":      "رسالتك",
    "contact.send":     "إرسال",
    "contact.connectTitle": "قنوات التواصل",
    "contact.connectDesc":  "يمكنك أيضًا الوصول إليّ عبر هذه المنصات.",
    "contact.top":          "العودة للأعلى",
    "footer.highlights": "نبذة",
    "footer.work":       "مشاريعي",
    "footer.contact":    "تواصل",
    "toast.copied": "تم نسخ البريد ✓",
    "toast.sent":   "تم إرسال رسالتك ✓",
    "toast.fail":   "تعذّر الإرسال — حاول مرة أخرى."
  },
  en: {
    dir: "ltr", lang: "en", toggle: "العربية",
    "brand.sub":        "Portfolio",
    "nav.home":         "Home",
    "nav.highlights":   "Highlights",
    "nav.work":         "Work",
    "nav.contact":      "Contact",
    "nav.cv":           "CV",
    "hero.eyebrow":     "Data · Execution · Impact",
    "hero.title":       "Abdullah Alomran",
    "hero.subtitle":    "CS student with a background in fast-moving environments. I gravitated toward data science because I think in systems — I need to know the goal, map the gaps, and work toward something measurable. Data gave that a language.",
    "hero.cta1":        "See my work",
    "hero.cta2":        "Get in touch",
    "hero.copy":        "Copy email",
    "hero.badge":       "Data Analytics",
    "hero.cardTitle":   "Quick Glimpse",
    "hero.cardTag":     "Clear · Practical · Consistent",
    "hero.line1k":      "Focus",
    "hero.line1v":      "Analytics → Data Science",
    "hero.line2k":      "Style",
    "hero.line2v":      "KPI-driven, clean outputs",
    "hero.line3k":      "Links",
    "hero.cv":          "Download CV",
    "hero.more":        "Highlights →",
    "hl.title":         "Highlights",
    "hl.desc":          "How I work, in three points.",
    "hl.c1t":           "Goal first",
    "hl.c1d":           "I start with the question, not the data. What decision does this analysis serve? That shapes everything.",
    "hl.c2t":           "Clean work",
    "hl.c2d":           "Organized folders, documented queries, reproducible steps. I build things other people can actually read.",
    "hl.c3t":           "Showable output",
    "hl.c3d":           "Every project ends with something concrete — a dashboard, a notebook, a working pipeline. Not just a description.",
    "work.title":       "Work",
    "work.desc":        "Three projects in progress. Details coming soon.",
    "work.p1t":         "Executive Dashboard",
    "work.p1d":         "KPIs and actionable insights built for decision-makers, not analysts.",
    "work.p2t":         "SQL Analytics Pack",
    "work.p2d":         "A structured set of real queries — aggregations, CTEs, window functions on actual datasets.",
    "work.p3t":         "Data Cleaning Pipeline",
    "work.p3d":         "Automated quality checks and weekly-ready exports. Built to run without hand-holding.",
    "work.soon":        "Deploying soon",
    "work.repo":        "Repo",
    "work.demo":        "Preview",
    "contact.title":    "Contact",
    "contact.desc":     "A question or a collaboration idea — just send me a message.",
    "contact.name":     "Name",
    "contact.email":    "Email",
    "contact.msg":      "Message",
    "contact.send":     "Send",
    "contact.connectTitle": "Connect",
    "contact.connectDesc":  "Or find me on any of these platforms.",
    "contact.top":          "Back to top",
    "footer.highlights": "Highlights",
    "footer.work":       "Work",
    "footer.contact":    "Contact",
    "toast.copied": "Email copied ✓",
    "toast.sent":   "Message sent ✓",
    "toast.fail":   "Couldn't send right now. Try again later."
  }
};

function applyLanguage(code) {
  const t = dict[code];
  root.lang = t.lang;
  root.dir  = t.dir;
  document.querySelectorAll(".lang-label").forEach(el => { el.textContent = t.toggle; });
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem(STORAGE_LANG, currentLang);
  applyLanguage(currentLang);
}

document.getElementById("langToggle")      ?.addEventListener("click", toggleLanguage);
document.getElementById("langToggleMobile")?.addEventListener("click", toggleLanguage);
applyLanguage(currentLang);

/* ── Copy email ───────────────────────────────────────────── */
document.getElementById("copyEmailBtn")?.addEventListener("click", async () => {
  const email = "abdullahalomran97@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    toast(dict[currentLang]["toast.copied"]);
  } catch {
    toast(`📋 ${email}`);
  }
});

/* ── Back to top ──────────────────────────────────────────── */
document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Mobile menu ──────────────────────────────────────────── */
const burger     = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobile() {
  mobileMenu?.classList.remove("open");
  burger?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobile));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMobile(); });
}

/* ── Scroll spy ───────────────────────────────────────────── */
const SECTION_IDS = ["home", "highlights", "work", "contact"];
const navLinks    = document.querySelectorAll(".nav__link");

function setActiveNav(id) {
  navLinks.forEach(a => a.classList.toggle("active", a.dataset.section === id));
}

let sectionTops = {};
function cacheSectionTops() {
  sectionTops = Object.fromEntries(
    SECTION_IDS.map(id => {
      const el = document.getElementById(id);
      return [id, el ? el.offsetTop : 0];
    })
  );
}

function computeActiveSection() {
  const trigger = window.scrollY + window.innerHeight * 0.4;
  let active = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    if (sectionTops[id] <= trigger) active = id;
  }
  return active;
}

function updateNav() { setActiveNav(computeActiveSection()); }

cacheSectionTops();
window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", () => { cacheSectionTops(); updateNav(); }, { passive: true });
window.addEventListener("load",   () => { cacheSectionTops(); updateNav(); });
updateNav();
navLinks.forEach(a => a.addEventListener("click", () => a.blur()));

/* ── Reveal on scroll ─────────────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal");
const revealIO  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
revealEls.forEach(el => revealIO.observe(el));

/* ── Contact form → Formspree ─────────────────────────────── */
const form       = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("[type=submit]");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "…"; }

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      if (res.ok) {
        toast(dict[currentLang]["toast.sent"]);
        if (formStatus) formStatus.textContent = "";
        form.reset();
      } else { throw new Error("non-ok"); }
    } catch {
      const failMsg = dict[currentLang]["toast.fail"];
      toast(failMsg);
      if (formStatus) formStatus.textContent = failMsg;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = dict[currentLang]["contact.send"];
      }
    }
  });
}
