window.AbPortfolio = window.AbPortfolio || {};

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toastEl = document.getElementById("toast");
function toast(msg){
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ========= Formspree (Put your endpoint here) =========
   After you create Formspree form, you will get a URL like:
   https://formspree.io/f/abcdwxyz
*/
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzbyjdk";

/* =========================
   Language (AR/EN) - natural copy
========================= */
const toggle = document.getElementById("langToggle");
const langMobile = document.getElementById("langToggleMobile");
let current = "ar";

const dict = {
  ar: {
    dir: "rtl",
    lang: "ar",
    toggle: "English",
    "brand.sub": "Portfolio",

    "nav.home": "الرئيسية",
    "nav.story": "قصتي",
    "nav.work": "الأعمال",
    "nav.skills": "المهارات",
    "nav.interests": "اهتمامات",
    "nav.contact": "تواصل",
    "nav.cv": "CV",
    "nav.theme": "ثيم",

    "hero.eyebrow": "BUILD • ANALYZE • IMPROVE",
    "hero.title": "عبدالله العمران — أحوّل البيانات لقرارات مفهومة",
    "hero.subtitle": "هذا الموقع يعرّفك على عبدالله بشكل تقني: عقلية قياس + تنفيذ + تطوير مستمر. اهتمامي الأساسي هو Data Analytics وData Science.",
    "hero.cta1": "شاهد الأعمال",
    "hero.cta2": "اقرأ قصتي",
    "hero.copy": "نسخ الإيميل",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "وش تتوقع من عبدالله؟",
    "hero.cardTag": "Clarity • Discipline • Growth",
    "hero.p1t": "وضوح الهدف",
    "hero.p1d": "كل شيء يبدأ بسؤال: وش القرار؟",
    "hero.p2t": "تنفيذ مضبوط",
    "hero.p2d": "تنظيم البيانات + تحليل + توثيق.",
    "hero.p3t": "عرض قوي",
    "hero.p3d": "Insights واضحة + Dashboard جذاب.",
    "hero.cv": "تحميل CV",
    "hero.contact": "تواصل",

    "story.title": "قصتي",
    "story.desc": "رحلة تجمع بين الدراسة والعمل الميداني — والنتيجة: عقلية قياس وتحسين مستمر.",
    "story.h1": "كيف بدأ اهتمامي بالبيانات؟",
    "story.p1": "متابعة الأرقام يوميًا تغيّر طريقة التفكير: الأرقام ما هي نهاية، هي بداية سؤال. ومع الوقت صار التحليل عادة يومية.",
    "story.b1": "KPI mindset",
    "story.b2": "Consistency",
    "story.b3": "Learning by doing",
    "story.h2": "مبادئ شغلي",
    "story.pr1t": "وضوح",
    "story.pr1d": "التقرير القوي بسيط ومقنع.",
    "story.pr2t": "توثيق",
    "story.pr2d": "كل مشروع لازم يكون قابل للفهم والتشغيل.",
    "story.pr3t": "تحسين",
    "story.pr3d": "كل أسبوع: تطوير صغير لكن ثابت.",
    "story.h3": "وش جاي بعد؟",
    "story.p3": "مشاريع تحليل + Dashboards + Case Studies… الهدف: أعمال تثبت الجدية وتبين الأسلوب.",

    "work.title": "الأعمال",
    "work.desc": "مشاريع قادمة بأسلوب Showcase — قريبًا سيتم نشرها بشكل كامل.",
    "work.featured": "Featured",
    "work.case": "Case Pack",
    "work.pipeline": "Pipeline",
    "work.p1t": "Executive Dashboard (Weekly Report)",
    "work.p1d": "لوحة KPIs + صفحة Insights قابلة للتنفيذ.",
    "work.p2t": "SQL Analytics Pack",
    "work.p2d": "استعلامات منظمة لمشاكل تحليل واقعية.",
    "work.p3t": "Data Cleaning + Quality Checks",
    "work.p3d": "تنظيف + جودة + تصدير Dataset أسبوعي.",
    "work.soon": "Soon to be deployed!",
    "work.repo": "Repo",
    "work.demo": "Preview",

    "skills.title": "المهارات",
    "skills.desc": "أدوات أستخدمها فعليًا + أسلوب عمل يعطي نتائج.",
    "skills.tech": "قدرات تقنية",
    "skills.soft": "أسلوبي في العمل",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",

    "interests.title": "اهتمامات",
    "interests.desc": "مجالات أتابعها باستمرار وتغذّي شغفي.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, and decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking and turning data into prediction.",
    "interests.i3t": "Security",
    "interests.i3d": "Curious about reliability and security mindset.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Clean structure, real outcomes, continuous improvement.",

    "contact.title": "تواصل",
    "contact.desc": "ارسل رسالة مباشرة — رح توصلني على الإيميل.",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.msg": "الرسالة",
    "contact.send": "إرسال",
    "contact.connectTitle": "خلّنا نتواصل",
    "contact.connectDesc": "إذا تحب تتواصل بشكل أسرع، تقدر تزور حساباتي.",
    "contact.top": "للأعلى ↑",

    "footer.story": "قصتي",
    "footer.work": "الأعمال",
    "footer.skills": "المهارات",
    "footer.contact": "تواصل",

    "toast.copied": "تم نسخ الإيميل ✅",
    "toast.sent": "تم إرسال الرسالة ✅",
    "toast.fail": "تعذر الإرسال الآن — جرّب لاحقًا.",
    "toast.missing": "لازم تضيف رابط Formspree أولاً.",
    "toast.themeDark": "الوضع الداكن 🌙",
    "toast.themeLight": "الوضع الفاتح ☀️",
  },

  en: {
    dir: "ltr",
    lang: "en",
    toggle: "العربية",
    "brand.sub": "Portfolio",

    "nav.home": "Home",
    "nav.story": "Story",
    "nav.work": "Work",
    "nav.skills": "Skills",
    "nav.interests": "Interests",
    "nav.contact": "Contact",
    "nav.cv": "CV",
    "nav.theme": "Theme",

    "hero.eyebrow": "BUILD • ANALYZE • IMPROVE",
    "hero.title": "Abdullah Alomran — turning data into clear decisions",
    "hero.subtitle": "A portfolio that reflects discipline, execution, and continuous growth. Focused on Data Analytics and Data Science.",
    "hero.cta1": "View work",
    "hero.cta2": "Read my story",
    "hero.copy": "Copy email",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "What to expect",
    "hero.cardTag": "Clarity • Discipline • Growth",
    "hero.p1t": "Goal clarity",
    "hero.p1d": "Start from the decision, then the KPI.",
    "hero.p2t": "Structured execution",
    "hero.p2d": "Organize data, analyze, document.",
    "hero.p3t": "Strong delivery",
    "hero.p3d": "Clear insights and persuasive dashboards.",
    "hero.cv": "Download CV",
    "hero.contact": "Contact",

    "story.title": "Story",
    "story.desc": "A journey between study and real work — shaped by measurement and steady improvement.",
    "story.h1": "Where did the data interest start?",
    "story.p1": "Daily numbers change how you think: metrics aren’t the end — they’re the start of a better question. Over time, analysis becomes a habit.",
    "story.b1": "KPI mindset",
    "story.b2": "Consistency",
    "story.b3": "Learning by doing",
    "story.h2": "How I work",
    "story.pr1t": "Clarity",
    "story.pr1d": "Great reporting is simple and convincing.",
    "story.pr2t": "Documentation",
    "story.pr2d": "Projects should be runnable and understandable.",
    "story.pr3t": "Improvement",
    "story.pr3d": "Small progress, every week.",
    "story.h3": "What’s next?",
    "story.p3": "Analytics projects, dashboards, and case studies — built to show real dedication.",

    "work.title": "Work",
    "work.desc": "Upcoming showcase projects — launching soon with full details.",
    "work.featured": "Featured",
    "work.case": "Case Pack",
    "work.pipeline": "Pipeline",
    "work.p1t": "Executive Dashboard (Weekly Report)",
    "work.p1d": "Executive KPIs with actionable insights.",
    "work.p2t": "SQL Analytics Pack",
    "work.p2d": "Structured SQL cases for real analysis problems.",
    "work.p3t": "Data Cleaning + Quality Checks",
    "work.p3d": "Cleaning, QA checks, and weekly exports.",
    "work.soon": "Soon to be deployed!",
    "work.repo": "Repo",
    "work.demo": "Preview",

    "skills.title": "Skills",
    "skills.desc": "Tools I actually use — with an execution-first mindset.",
    "skills.tech": "Technical",
    "skills.soft": "Work style",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",

    "interests.title": "Interests",
    "interests.desc": "Topics I actively follow and build around.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking and prediction with data.",
    "interests.i3t": "Security",
    "interests.i3d": "Reliability and security mindset.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Clean structure, real outcomes, steady improvement.",

    "contact.title": "Contact",
    "contact.desc": "Send a message — it will reach my inbox.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.msg": "Message",
    "contact.send": "Send",
    "contact.connectTitle": "Let’s connect",
    "contact.connectDesc": "For quicker reach, you can use my social profiles.",
    "contact.top": "Back to top ↑",

    "footer.story": "Story",
    "footer.work": "Work",
    "footer.skills": "Skills",
    "footer.contact": "Contact",

    "toast.copied": "Email copied ✅",
    "toast.sent": "Message sent ✅",
    "toast.fail": "Couldn’t send right now. Try again later.",
    "toast.missing": "Add your Formspree endpoint first.",
    "toast.themeDark": "Dark mode 🌙",
    "toast.themeLight": "Light mode ☀️",
  }
};

function applyLanguage(code){
  const t = dict[code];
  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;

  if (toggle) toggle.textContent = t.toggle;
  if (langMobile) langMobile.textContent = t.toggle;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
}

function toggleLanguage(){
  current = current === "ar" ? "en" : "ar";
  applyLanguage(current);
}

if (toggle) toggle.addEventListener("click", toggleLanguage);
if (langMobile) langMobile.addEventListener("click", toggleLanguage);
applyLanguage(current);

/* Copy email */
const copyBtn = document.getElementById("copyEmailBtn");
if (copyBtn){
  copyBtn.addEventListener("click", async () => {
    const email = "abdullahalomran97@gmail.com";
    try{
      await navigator.clipboard.writeText(email);
      toast(dict[current]["toast.copied"]);
    }catch{
      const tmp = document.createElement("textarea");
      tmp.value = email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
      toast(dict[current]["toast.copied"]);
    }
  });
}

/* Theme toggle */
const themeBtn = document.getElementById("themeToggle");
const themeMobile = document.getElementById("themeToggleMobile");
const savedTheme = localStorage.getItem("abd_theme");
if (savedTheme) document.body.setAttribute("data-theme", savedTheme);

function setTheme(next){
  if (next === "light") document.body.setAttribute("data-theme","light");
  else document.body.removeAttribute("data-theme");
  localStorage.setItem("abd_theme", next);
  toast(next === "light" ? dict[current]["toast.themeLight"] : dict[current]["toast.themeDark"]);
}
function toggleTheme(){
  const isLight = document.body.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
}
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
if (themeMobile) themeMobile.addEventListener("click", toggleTheme);

/* Back to top */
const backToTop = document.getElementById("backToTop");
if (backToTop){
  backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}

/* Mobile menu */
const burger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
function closeMobile(){
  if (!mobileMenu || !burger) return;
  mobileMenu.classList.remove("open");
  burger.setAttribute("aria-expanded","false");
  mobileMenu.setAttribute("aria-hidden","true");
}
if (burger && mobileMenu){
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobile));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMobile(); });
}

/* Reveal on scroll */
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add("in");
      io.unobserve(ent.target);
    }
  });
},{threshold:0.12});
reveals.forEach(el=> io.observe(el));

/* Scroll spy */
const sectionIds = ["home","story","work","skills","interests","contact"];
const navLinks = document.querySelectorAll(".nav__link");
function setActive(id){
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("data-section") === id));
}
const spy = new IntersectionObserver((entries)=>{
  let best = null;
  for (const ent of entries){
    if(ent.isIntersecting){
      if(!best || ent.intersectionRatio > best.intersectionRatio) best = ent;
    }
  }
  if(best) setActive(best.target.id);
},{threshold:[0.25,0.35,0.5,0.65]});
sectionIds.forEach(id=>{
  const el = document.getElementById(id);
  if(el) spy.observe(el);
});

/* ===== Contact form: actually send email via Formspree ===== */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")){
      toast(dict[current]["toast.missing"]);
      if (status) status.textContent = dict[current]["toast.missing"];
      return;
    }

    const formData = new FormData(form);

    try{
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (res.ok){
        toast(dict[current]["toast.sent"]);
        if (status) status.textContent = dict[current]["toast.sent"];
        form.reset();
      }else{
        toast(dict[current]["toast.fail"]);
        if (status) status.textContent = dict[current]["toast.fail"];
      }
    }catch{
      toast(dict[current]["toast.fail"]);
      if (status) status.textContent = dict[current]["toast.fail"];
    }
  });
}

