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

/* =========================
   Language (AR/EN)
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
    "hero.title": "عبدالله العمران — أبني أشياء “تتحرك” بالبيانات",
    "hero.subtitle": "Portfolio يوضح من أنا: شغف تقنية + خبرة ميدانية + عقلية KPI. أهتم بـ Data Analytics وData Science وأحوّل الأرقام إلى قرار واضح.",
    "hero.cta1": "شاهد الأعمال",
    "hero.cta2": "اقرأ قصتي",
    "hero.copy": "نسخ الإيميل",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "ما الذي أقدمه؟",
    "hero.cardTag": "Clear • Practical • Data-driven",
    "hero.p1t": "وضوح الهدف",
    "hero.p1d": "أربط كل تحليل بـ KPI وقرار.",
    "hero.p2t": "تنفيذ مرتب",
    "hero.p2d": "SQL + تنظيف + توثيق + نتائج.",
    "hero.p3t": "عرض جذّاب",
    "hero.p3d": "Dashboards بسيطة ومقنعة.",
    "hero.cv": "تحميل CV",
    "hero.contact": "تواصل الآن",

    "story.title": "قصتي",
    "story.desc": "أنا شخص يحب “النتيجة”. من الدراسة إلى العمل الميداني، تعلمت إن الأداء الحقيقي يبدأ من البيانات + الانضباط.",
    "story.h1": "كيف بدأ اهتمامي بالبيانات؟",
    "story.p1": "لما تتابع KPIs يوميًا في بيئة عمل سريعة، تبدأ تشوف “القصة” خلف الأرقام: ليش ارتفع؟ ليش نزل؟ وش القرار؟ هنا صار التحليل بالنسبة لي شيء عملي وليس نظري.",
    "story.b1": "KPI mindset",
    "story.b2": "Consistency",
    "story.b3": "Learning by doing",
    "story.h2": "مبادئي في الشغل",
    "story.pr1t": "وضوح",
    "story.pr1d": "التقرير الجيد يفهمه أي شخص.",
    "story.pr2t": "توثيق",
    "story.pr2d": "مشروع بدون README = مشروع ناقص.",
    "story.pr3t": "تحسين مستمر",
    "story.pr3d": "كل أسبوع خطوة للأمام.",
    "story.h3": "الآن.. ماذا أبني؟",
    "story.p3": "Portfolio هذا هو “واجهة” لمشاريعي القادمة: SQL + Power BI + Case Studies + Python pipelines. الهدف: أعمال قابلة للعرض وتثبت الجدية.",

    "work.title": "الأعمال",
    "work.desc": "بدل “قائمة مهام”، هنا Showcase: كل مشروع له هدف + أدوات + مخرجات + ماذا تعلمت.",
    "work.featured": "Featured",
    "work.case": "Case Pack",
    "work.pipeline": "Pipeline",
    "work.p1t": "Executive Dashboard (Weekly Report)",
    "work.p1d": "لوحة تنفيذية تركز على KPIs الأساسية + Insights قابلة للتنفيذ.",
    "work.p2t": "SQL Analytics Pack",
    "work.p2d": "مجموعة استعلامات منظمة لمشاكل واقعية (تحليل نمو، أفضل منتجات، عملاء…).",
    "work.p3t": "Data Cleaning + Quality Checks",
    "work.p3d": "تنظيف بيانات + فحوصات جودة + تصدير dataset جاهز للتحديث.",
    "work.more": "عرض التفاصيل",
    "work.goal": "الهدف",
    "work.stack": "الأدوات",
    "work.output": "المخرجات",
    "work.p1goal": "توضيح أداء المتجر أسبوعيًا لصناع القرار.",
    "work.p1o1": "KPI page (Revenue/Orders/AOV/Repeat Rate)",
    "work.p1o2": "Insights page (what happened + why + next action)",
    "work.p1o3": "README + refresh instructions",
    "work.p2o1": "MoM Growth + Top products",
    "work.p2o2": "Customer retention metrics",
    "work.p2o3": "Well-documented SQL file + comments",
    "work.p3o1": "Null checks + duplicates + types",
    "work.p3o2": "Export weekly-ready CSV",
    "work.p3o3": "Reusable pipeline structure",
    "work.repo": "Repo",
    "work.demo": "Preview",

    "skills.title": "المهارات",
    "skills.desc": "مهارات تقنية + مهارات شخصية — لكن بصياغة “Portfolio” وليس CV.",
    "skills.tech": "قدرات تقنية",
    "skills.soft": "أسلوبي في العمل",
    "skills.sqlDesc": "Joins • Aggregations • CTE • Window Functions",
    "skills.biDesc": "Modeling • Measures • DAX • Storytelling",
    "skills.pyDesc": "pandas • cleaning • exporting datasets",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",
    "skills.ar": "Arabic (Native)",
    "skills.en": "English (Advanced)",

    "interests.title": "اهتماماتي التقنية",
    "interests.desc": "الأشياء اللي تعطيني حماس، وتحدد اتجاهي القادم.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, and business decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking, feature ideas, and turning data into prediction.",
    "interests.i3t": "Security & Networks",
    "interests.i3d": "Curious about security mindset and how systems stay reliable.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Organized code, clean structure, real outcomes.",

    "contact.title": "تواصل",
    "contact.desc": "إذا تبغى تتواصل أو تسأل عن شيء — ارسل رسالة. 👇",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.msg": "الرسالة",
    "contact.send": "إرسال",
    "contact.direct": "معلومات مباشرة",
    "contact.top": "للأعلى ↑",

    "footer.story": "قصتي",
    "footer.work": "الأعمال",
    "footer.skills": "المهارات",
    "footer.contact": "تواصل",

    "toast.copied": "تم نسخ الإيميل ✅",
    "toast.sent": "تم إرسال الرسالة بنجاح ✅",
    "toast.themeDark": "تم تفعيل الوضع الداكن 🌙",
    "toast.themeLight": "تم تفعيل الوضع الفاتح ☀️",
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
    "hero.title": "Abdullah Alomran — building with data-driven thinking",
    "hero.subtitle": "A portfolio that shows who I am: tech passion + hands-on work + KPI mindset. Focused on Data Analytics & Data Science to turn numbers into decisions.",
    "hero.cta1": "View work",
    "hero.cta2": "Read my story",
    "hero.copy": "Copy email",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "What I bring",
    "hero.cardTag": "Clear • Practical • Data-driven",
    "hero.p1t": "Goal clarity",
    "hero.p1d": "Every analysis ties to a KPI & decision.",
    "hero.p2t": "Structured execution",
    "hero.p2d": "SQL + cleaning + docs + results.",
    "hero.p3t": "Strong delivery",
    "hero.p3d": "Simple dashboards that persuade.",
    "hero.cv": "Download CV",
    "hero.contact": "Contact now",

    "story.title": "Story",
    "story.desc": "I’m outcome-driven. From study to fast-paced work, I learned performance starts with data + discipline.",
    "story.h1": "How did my data interest start?",
    "story.p1": "When you track KPIs daily, you start seeing the story behind numbers: why it moved, what changed, and what decision should follow. That made analytics practical for me.",
    "story.b1": "KPI mindset",
    "story.b2": "Consistency",
    "story.b3": "Learning by doing",
    "story.h2": "My principles",
    "story.pr1t": "Clarity",
    "story.pr1d": "A good report is understandable to anyone.",
    "story.pr2t": "Documentation",
    "story.pr2d": "No README = incomplete project.",
    "story.pr3t": "Continuous improvement",
    "story.pr3d": "One step forward each week.",
    "story.h3": "What I’m building now",
    "story.p3": "This portfolio is a front door for upcoming work: SQL + Power BI + Case studies + Python pipelines — focused on showable outcomes.",

    "work.title": "Work",
    "work.desc": "Not a task list — a showcase: goal + tools + outputs + what I learned.",
    "work.featured": "Featured",
    "work.case": "Case Pack",
    "work.pipeline": "Pipeline",
    "work.p1t": "Executive Dashboard (Weekly Report)",
    "work.p1d": "Executive KPIs + actionable insights.",
    "work.p2t": "SQL Analytics Pack",
    "work.p2d": "Structured queries for real problems (growth, products, customers…).",
    "work.p3t": "Data Cleaning + Quality Checks",
    "work.p3d": "Cleaning + QA + export weekly-ready dataset.",
    "work.more": "Show details",
    "work.goal": "Goal",
    "work.stack": "Stack",
    "work.output": "Outputs",
    "work.p1goal": "Weekly performance clarity for decision-makers.",
    "work.p1o1": "KPI page (Revenue/Orders/AOV/Repeat Rate)",
    "work.p1o2": "Insights page (what happened + why + next action)",
    "work.p1o3": "README + refresh instructions",
    "work.p2o1": "MoM Growth + Top products",
    "work.p2o2": "Customer retention metrics",
    "work.p2o3": "Well-documented SQL file + comments",
    "work.p3o1": "Null checks + duplicates + types",
    "work.p3o2": "Export weekly-ready CSV",
    "work.p3o3": "Reusable pipeline structure",
    "work.repo": "Repo",
    "work.demo": "Preview",

    "skills.title": "Skills",
    "skills.desc": "Technical + soft skills — but presented as a portfolio, not a CV.",
    "skills.tech": "Technical strengths",
    "skills.soft": "How I work",
    "skills.sqlDesc": "Joins • Aggregations • CTE • Window Functions",
    "skills.biDesc": "Modeling • Measures • DAX • Storytelling",
    "skills.pyDesc": "pandas • cleaning • exporting datasets",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",
    "skills.ar": "Arabic (Native)",
    "skills.en": "English (Advanced)",

    "interests.title": "Interests",
    "interests.desc": "What genuinely excites me and shapes my direction.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, business decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking, feature ideas, turning data into prediction.",
    "interests.i3t": "Security & Networks",
    "interests.i3d": "Curiosity about security mindset and reliability.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Organized code, clean structure, real outcomes.",

    "contact.title": "Contact",
    "contact.desc": "Want to connect or ask something? Send a message 👇",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.msg": "Message",
    "contact.send": "Send",
    "contact.direct": "Direct info",
    "contact.top": "Back to top ↑",

    "footer.story": "Story",
    "footer.work": "Work",
    "footer.skills": "Skills",
    "footer.contact": "Contact",

    "toast.copied": "Email copied ✅",
    "toast.sent": "Message sent ✅",
    "toast.themeDark": "Dark mode enabled 🌙",
    "toast.themeLight": "Light mode enabled ☀️",
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

/* Demo form submit */
window.AbPortfolio.handleSubmit = function(e){
  e.preventDefault();
  const status = document.getElementById("formStatus");
  const msg = dict[current]["toast.sent"] || "Sent ✅";
  if (status) status.textContent = msg;
  toast(msg);
  e.target.reset();
  return false;
};

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

/* Theme toggle (persist) */
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
