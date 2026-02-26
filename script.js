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
    "nav.about": "عنّي",
    "nav.journey": "رحلتي",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.interests": "اهتمامات",
    "nav.contact": "تواصل",
    "nav.cv": "CV",
    "nav.theme": "ثيم",

    "hero.eyebrow": "TECH • BUSINESS • DATA",
    "hero.title": "عبدالله العمران — شغفي تحويل البيانات إلى قيمة",
    "hero.subtitle": "طالب علوم الحاسب بجامعة الإمام عبدالرحمن بن فيصل. خبرة عملية في بيئات سريعة (Jarir + Huawei) مع تركيز على KPIs، التحليل، والتقارير — واهتمام قوي بـ Data Analytics وData Science.",
    "hero.cta1": "استعرض أعمالي",
    "hero.cta2": "خلّنا نتواصل",
    "hero.copy": "نسخ الإيميل",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "ملخص سريع",
    "hero.cardTag": "أثر + انضباط + نمو",
    "hero.k1": "إنجاز",
    "hero.v1": "Employee of the Month",
    "hero.k2": "أسلوبي",
    "hero.v2": "KPI-driven reporting",
    "hero.k3": "اتجاهي",
    "hero.v3": "Data Analysis → Data Science",
    "hero.cv": "تحميل CV",
    "hero.journeyBtn": "رحلتي",

    "about.title": "عنّي",
    "about.desc": "شخصيتي عملية: أحب النتائج الواضحة. أبدأ من الهدف، أرتّب البيانات، أطلع Insights، ثم أقدمها بشكل يفهمه أي شخص.",
    "about.h1": "كيف أشتغل؟",
    "about.s1t": "أفهم المشكلة",
    "about.s1d": "وش القرار؟ وش الـKPI؟ وش اللي يهم الإدارة؟",
    "about.s2t": "أشتغل على البيانات",
    "about.s2d": "SQL / تنظيف / تنظيم / تحقق من الجودة",
    "about.s3t": "أعرض النتيجة",
    "about.s3d": "Dashboard بسيط + توصيات قابلة للتنفيذ",
    "about.h2": "وش يميز عبدالله؟",
    "about.b1": "Professionalism + انضباط عالي",
    "about.b2": "تواصل واضح مع مختلف الأشخاص",
    "about.b3": "ثبات تحت الضغط + تنفيذ يومي",
    "about.b4": "فضول تقني قوي (Data/AI/Security)",

    "journey.title": "رحلتي الأكاديمية والمهنية",
    "journey.desc": "من علوم الحاسب إلى خبرة ميدانية في البيع وإدارة المتجر — مع اتجاه واضح نحو البيانات.",
    "journey.edu": "التعليم",
    "journey.eduTitle": "BSc Computer Science",
    "journey.eduMeta": "Imam Abdulrahman Bin Faisal University • 2022–2027 (Expected)",
    "journey.jarir": "Jarir",
    "journey.jarirTitle": "Salesman — Electronics & Smartphones",
    "journey.jarirMeta": "Dhahran • 09/2023–01/2026",
    "journey.jarir1": "Customer engagement + marketing initiatives",
    "journey.jarir2": "Employee of the Month (June 2024)",
    "journey.jarir3": "Backup support for aftersales readiness",
    "journey.huawei": "Huawei",
    "journey.huaweiTitle": "Store Manager (via TASC)",
    "journey.huaweiMeta": "Khobar • 01/2026–Present",
    "journey.huawei1": "Led daily operations and retail standards",
    "journey.huawei2": "Tracked KPIs (sales, conversion, attach rate)",
    "journey.huawei3": "Coordinated reporting and action plans",

    "skills.title": "المهارات",
    "skills.desc": "مزيج بين مهارات تقنية ومهارات شخصية — الهدف: نتائج واضحة وتواصل قوي.",
    "skills.tech": "مهارات تقنية",
    "skills.sql": "SQL",
    "skills.sqlDesc": "Joins • Aggregations • CTE • Window Functions",
    "skills.bi": "Power BI",
    "skills.biDesc": "Modeling • Measures • DAX • Storytelling",
    "skills.py": "Python",
    "skills.pyDesc": "pandas • cleaning • exporting datasets",
    "skills.soft": "مهارات شخصية",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",
    "skills.ar": "Arabic (Native)",
    "skills.en": "English (Advanced)",

    "projects.title": "المشاريع",
    "projects.desc": "مشاريع تقنية تعكس طريقة تفكيري: هدف واضح → تنفيذ مرتب → نتيجة قابلة للعرض.",
    "projects.p1t": "Executive Dashboard (Weekly Report)",
    "projects.p1d": "KPIs مثل Revenue/Orders/AOV/Repeat Rate + صفحة Insights + تصميم واضح للإدارة.",
    "projects.p2t": "SQL Analytics Pack",
    "projects.p2d": "استعلامات منظمة لمشاكل واقعية (Top Products, MoM Growth, Customer metrics).",
    "projects.p3t": "Data Cleaning + Quality Checks",
    "projects.p3d": "تنظيف + اكتشاف nulls/duplicates + تصدير dataset جاهز للتحديث الأسبوعي.",
    "projects.repo": "Repo",
    "projects.demo": "Preview",

    "interests.title": "اهتماماتي التقنية",
    "interests.desc": "السبايس الحقيقي: الأشياء اللي تشدني فعلاً في التقنية والبيانات.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, and business decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking, feature ideas, and turning data into prediction.",
    "interests.i3t": "Security & Networks",
    "interests.i3d": "Curious about security mindset and how systems stay reliable.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Organized code, clear structure, and delivering real outcomes.",
    "interests.nowTitle": "حالياً أتعلم/أطور",
    "interests.n1": "Advanced SQL (windows)",
    "interests.n2": "Power BI dashboards",
    "interests.n3": "Python for data",
    "interests.n4": "Case studies writing",

    "contact.title": "تواصل",
    "contact.desc": "ارسل رسالة أو تواصل مباشرة — سعيد بأي فرصة أو تعاون.",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.msg": "الرسالة",
    "contact.send": "إرسال",
    "contact.direct": "معلومات مباشرة",
    "contact.top": "للأعلى ↑",

    "footer.about": "عنّي",
    "footer.journey": "رحلتي",
    "footer.projects": "المشاريع",
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
    "nav.about": "About",
    "nav.journey": "Journey",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.interests": "Interests",
    "nav.contact": "Contact",
    "nav.cv": "CV",
    "nav.theme": "Theme",

    "hero.eyebrow": "TECH • BUSINESS • DATA",
    "hero.title": "Abdullah Alomran — Turning data into value",
    "hero.subtitle": "Computer Science student at Imam Abdulrahman Bin Faisal University. Hands-on experience in fast-paced environments (Jarir + Huawei) with KPI tracking, analysis, and reporting — and a strong interest in Data Analytics & Data Science.",
    "hero.cta1": "View my work",
    "hero.cta2": "Let’s connect",
    "hero.copy": "Copy email",
    "hero.badge": "Data Analytics",
    "hero.cardTitle": "Quick snapshot",
    "hero.cardTag": "Impact • Discipline • Growth",
    "hero.k1": "Highlight",
    "hero.v1": "Employee of the Month",
    "hero.k2": "Style",
    "hero.v2": "KPI-driven reporting",
    "hero.k3": "Direction",
    "hero.v3": "Data Analysis → Data Science",
    "hero.cv": "Download CV",
    "hero.journeyBtn": "My journey",

    "about.title": "About",
    "about.desc": "I’m practical and outcome-driven. I start from the goal, organize the data, extract insights, then present them in a way anyone can understand.",
    "about.h1": "How I work",
    "about.s1t": "Understand the problem",
    "about.s1d": "What decision? Which KPI? What matters to stakeholders?",
    "about.s2t": "Work with the data",
    "about.s2d": "SQL / cleaning / structuring / quality checks",
    "about.s3t": "Present the result",
    "about.s3d": "Simple dashboard + actionable recommendations",
    "about.h2": "What makes Abdullah",
    "about.b1": "Professional and disciplined execution",
    "about.b2": "Clear communication (technical & non-technical)",
    "about.b3": "Consistent under pressure + daily delivery",
    "about.b4": "Strong tech curiosity (Data/AI/Security)",

    "journey.title": "Academic & Professional Journey",
    "journey.desc": "From CS studies to real-world leadership — with a clear direction toward data.",
    "journey.edu": "Education",
    "journey.eduTitle": "BSc Computer Science",
    "journey.eduMeta": "Imam Abdulrahman Bin Faisal University • 2022–2027 (Expected)",
    "journey.jarir": "Jarir",
    "journey.jarirTitle": "Salesman — Electronics & Smartphones",
    "journey.jarirMeta": "Dhahran • 09/2023–01/2026",
    "journey.jarir1": "Customer engagement + marketing initiatives",
    "journey.jarir2": "Employee of the Month (June 2024)",
    "journey.jarir3": "Backup support for aftersales readiness",
    "journey.huawei": "Huawei",
    "journey.huaweiTitle": "Store Manager (via TASC)",
    "journey.huaweiMeta": "Khobar • 01/2026–Present",
    "journey.huawei1": "Led daily operations and retail standards",
    "journey.huawei2": "Tracked KPIs (sales, conversion, attach rate)",
    "journey.huawei3": "Coordinated reporting and action plans",

    "skills.title": "Skills",
    "skills.desc": "A mix of technical and soft skills — with one goal: clear outcomes and strong communication.",
    "skills.tech": "Technical skills",
    "skills.sql": "SQL",
    "skills.sqlDesc": "Joins • Aggregations • CTE • Window Functions",
    "skills.bi": "Power BI",
    "skills.biDesc": "Modeling • Measures • DAX • Storytelling",
    "skills.py": "Python",
    "skills.pyDesc": "pandas • cleaning • exporting datasets",
    "skills.soft": "Soft skills",
    "skills.s1": "Communication",
    "skills.s2": "Teamwork",
    "skills.s3": "Problem-solving",
    "skills.s4": "Time management",
    "skills.s5": "Adaptability",
    "skills.s6": "Target-driven",
    "skills.ar": "Arabic (Native)",
    "skills.en": "English (Advanced)",

    "projects.title": "Projects",
    "projects.desc": "Projects that reflect how I think: clear goal → structured execution → presentable outcome.",
    "projects.p1t": "Executive Dashboard (Weekly Report)",
    "projects.p1d": "KPIs like Revenue/Orders/AOV/Repeat Rate + Insights page + executive-friendly design.",
    "projects.p2t": "SQL Analytics Pack",
    "projects.p2d": "Structured queries for real problems (Top Products, MoM Growth, customer metrics).",
    "projects.p3t": "Data Cleaning + Quality Checks",
    "projects.p3d": "Cleaning + null/duplicate checks + exporting weekly-ready dataset.",
    "projects.repo": "Repo",
    "projects.demo": "Preview",

    "interests.title": "Tech interests",
    "interests.desc": "The real spice — what genuinely pulls me toward tech and data.",
    "interests.i1t": "Data Analytics",
    "interests.i1d": "Dashboards, KPI design, storytelling, and business decisions.",
    "interests.i2t": "Data Science",
    "interests.i2d": "Model thinking, feature ideas, and turning data into prediction.",
    "interests.i3t": "Security & Networks",
    "interests.i3d": "Curious about security mindset and how systems stay reliable.",
    "interests.i4t": "Building Systems",
    "interests.i4d": "Organized code, clear structure, and delivering real outcomes.",
    "interests.nowTitle": "Currently learning/building",
    "interests.n1": "Advanced SQL (windows)",
    "interests.n2": "Power BI dashboards",
    "interests.n3": "Python for data",
    "interests.n4": "Case studies writing",

    "contact.title": "Contact",
    "contact.desc": "Send a message or reach out directly — happy to connect and collaborate.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.msg": "Message",
    "contact.send": "Send",
    "contact.direct": "Direct info",
    "contact.top": "Back to top ↑",

    "footer.about": "About",
    "footer.journey": "Journey",
    "footer.projects": "Projects",
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

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeMobile());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobile();
  });
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
const sectionIds = ["home","about","journey","skills","projects","interests","contact"];
const navLinks = document.querySelectorAll(".nav__link");

function setActive(id){
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-section") === id);
  });
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
