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

/* ── i18n ─────────────────────────────────────────────────── */
const FORMSPREE = "https://formspree.io/f/mvzbyjdk";
let currentLang = "en";

const dict = {
  ar: {
    dir: "rtl", lang: "ar", toggle: "English",
    "brand.sub":        "Portfolio",
    "nav.home":         "الرئيسية",
    "nav.highlights":   "لمحة",
    "nav.work":         "أعمال",
    "nav.contact":      "تواصل",
    "nav.cv":           "CV",
    "hero.eyebrow":     "Data · Execution · Impact",
    "hero.title":       "عبدالله العمران",
    "hero.subtitle":    "طالب علوم حاسب. أبني أشياء بالبيانات — استعلامات واضحة، لوحات تحكم مفيدة، وأكواد تشتغل فعلاً. أقل كلام، أكثر شغل.",
    "hero.cta1":        "الأعمال",
    "hero.cta2":        "تواصل",
    "hero.copy":        "نسخ الإيميل",
    "hero.badge":       "تحليل البيانات",
    "hero.cardTitle":   "لمحة سريعة",
    "hero.cardTag":     "واضح · عملي · منتظم",
    "hero.line1k":      "التركيز",
    "hero.line1v":      "Analytics → Data Science",
    "hero.line2k":      "الأسلوب",
    "hero.line2v":      "تقارير مبنية على KPIs",
    "hero.line3k":      "روابط",
    "hero.cv":          "تحميل CV",
    "hero.more":        "لمحة ←",
    "hl.title":         "لمحة سريعة",
    "hl.desc":          "طريقتي بالشغل، في ثلاث نقاط.",
    "hl.c1t":           "الهدف أولاً",
    "hl.c1d":           "أبدأ من السؤال، مو من البيانات. أي قرار يخدمه هذا التحليل؟ هذا يحدد كل شيء.",
    "hl.c2t":           "شغل نظيف",
    "hl.c2d":           "مجلدات مرتبة، استعلامات موثقة، خطوات قابلة للتكرار. أبني أشياء يقدر غيري يفهمها.",
    "hl.c3t":           "نتيجة قابلة للعرض",
    "hl.c3d":           "كل مشروع ينتهي بشيء ملموس — داشبورد، نوتبوك، أو باي بلاين شغال. مو بس وصف.",
    "work.title":       "الأعمال",
    "work.desc":        "ثلاثة مشاريع قيد التطوير. التفاصيل قريبًا.",
    "work.p1t":         "Executive Dashboard",
    "work.p1d":         "KPIs ورؤى قابلة للتنفيذ، مصممة لمتخذي القرار لا للمحللين.",
    "work.p2t":         "SQL Analytics Pack",
    "work.p2d":         "مجموعة منظمة من الاستعلامات الفعلية — تجميعات، CTEs، Window Functions.",
    "work.p3t":         "Data Cleaning Pipeline",
    "work.p3d":         "فحص جودة آلي وتصدير جاهز أسبوعيًا. يشتغل بدون إشراف.",
    "work.soon":        "قريبًا",
    "work.repo":        "Repo",
    "work.demo":        "معاينة",
    "contact.title":    "تواصل",
    "contact.desc":     "سؤال أو فكرة تعاون — ابعث لي.",
    "contact.name":     "الاسم",
    "contact.email":    "البريد",
    "contact.msg":      "الرسالة",
    "contact.send":     "إرسال",
    "contact.connectTitle": "تواصل معي",
    "contact.connectDesc":  "أو تجدني على هذه المنصات.",
    "contact.top":          "للأعلى",
    "footer.highlights": "لمحة",
    "footer.work":       "أعمال",
    "footer.contact":    "تواصل",
    "toast.copied": "تم نسخ الإيميل ✓",
    "toast.sent":   "تم الإرسال ✓",
    "toast.fail":   "تعذر الإرسال — حاول لاحقًا."
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
    "hero.subtitle":    "CS student. I build things with data — clean queries, clear dashboards, pipelines that actually work. Less talk, more output.",
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
  const root = document.documentElement;
  root.lang = t.lang;
  root.dir  = t.dir;

  // Update all toggle button labels
  document.querySelectorAll(".lang-label").forEach(el => {
    el.textContent = t.toggle;
  });

  // Translate all i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
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
  } catch {
    const tmp = Object.assign(document.createElement("textarea"), { value: email });
    document.body.appendChild(tmp); tmp.select(); document.execCommand("copy"); tmp.remove();
  }
  toast(dict[currentLang]["toast.copied"]);
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

/* ── Scroll spy — clean, no bleed ────────────────────────── */
const SECTION_IDS = ["home", "highlights", "work", "contact"];
const navLinks    = document.querySelectorAll(".nav__link");

function setActiveNav(id) {
  navLinks.forEach(a =>
    a.classList.toggle("active", a.dataset.section === id)
  );
}

function computeActiveSection() {
  // Trigger line = 40% down the viewport
  const trigger = window.scrollY + window.innerHeight * 0.4;
  let active = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top + window.scrollY <= trigger) {
      active = id;
    }
  }
  return active;
}

function updateNav() { setActiveNav(computeActiveSection()); }

window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav, { passive: true });
window.addEventListener("load",   updateNav);
updateNav();

// Remove lingering focus ring after click (keeps hover states clean)
navLinks.forEach(a => a.addEventListener("click", () => a.blur()));

/* ── Reveal on scroll ─────────────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal");
const revealIO  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealIO.unobserve(e.target);
    }
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
        if (formStatus) formStatus.textContent = dict[currentLang]["toast.sent"];
        form.reset();
      } else {
        throw new Error("non-ok");
      }
    } catch {
      toast(dict[currentLang]["toast.fail"]);
      if (formStatus) formStatus.textContent = dict[currentLang]["toast.fail"];
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = dict[currentLang]["contact.send"];
      }
    }
  });
}
