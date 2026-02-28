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

/* ====== Put your Formspree endpoint here ======
Example: https://formspree.io/f/abcdwxyz
*/
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzbyjdk";

/* Language */
const langBtn = document.getElementById("langToggle");
const langMobile = document.getElementById("langToggleMobile");
let current = "ar";

const dict = {
  ar: {
    dir: "rtl", lang: "ar", toggle: "English",
    "brand.sub": "Portfolio",
    "nav.home":"الرئيسية", "nav.highlights":"لمحة", "nav.work":"أعمال", "nav.contact":"تواصل",
    "nav.cv":"CV", "nav.theme":"ثيم",

    "hero.eyebrow":"DATA • EXECUTION • IMPACT",
    "hero.title":"عبدالله العمران",
    "hero.subtitle":"عقلية قياس + تنفيذ. أركز على تحويل البيانات إلى قرار واضح عبر SQL وPower BI، وبناء مشاريع مرتبة قابلة للعرض.",
    "hero.cta1":"الأعمال", "hero.cta2":"تواصل", "hero.copy":"نسخ الإيميل",
    "hero.badge":"Data Analytics",
    "hero.cardTitle":"لمحة سريعة",
    "hero.cardTag":"Clear • Practical • Consistent",
    "hero.line1k":"التركيز", "hero.line1v":"Analytics → Data Science",
    "hero.line2k":"الأسلوب", "hero.line2v":"KPI-driven reporting",
    "hero.line3k":"روابط", "hero.cv":"تحميل CV", "hero.more":"اللمحة",

    "hl.title":"لمحة سريعة",
    "hl.desc":"مختصر مفيد: أسلوبي في العمل، اهتمامي، والشيء اللي أقدمه.",
    "hl.c1t":"Decision-first", "hl.c1d":"أبدأ من القرار، ثم KPI، ثم التحليل.",
    "hl.c2t":"Clean execution", "hl.c2d":"تنظيم + توثيق + مخرجات واضحة.",
    "hl.c3t":"Portfolio-ready", "hl.c3d":"أبني مشاريع قابلة للعرض، مو مجرد كلام.",

    "work.title":"الأعمال",
    "work.desc":"مختارات مشاريع — قريبًا بتنزل بتفاصيلها كاملة.",
    "work.p1t":"Executive Dashboard", "work.p1d":"KPIs + insights لصُنّاع القرار.",
    "work.p2t":"SQL Analytics Pack", "work.p2d":"استعلامات منظمة لتحليل واقعي.",
    "work.p3t":"Data Cleaning Pipeline", "work.p3d":"Quality checks + exports جاهزة أسبوعيًا.",
    "work.soon":"Soon to be deployed!",
    "work.repo":"Repo", "work.demo":"Preview",

    "contact.title":"تواصل",
    "contact.desc":"ارسل رسالة — توصل مباشرة إلى البريد.",
    "contact.name":"الاسم", "contact.email":"البريد", "contact.msg":"الرسالة", "contact.send":"إرسال",
    "contact.connectTitle":"Connect", "contact.connectDesc":"تفضل الروابط الاجتماعية لو تبي.",
    "contact.top":"للأعلى ↑",

    "footer.highlights":"لمحة", "footer.work":"أعمال", "footer.contact":"تواصل",

    "toast.copied":"تم نسخ الإيميل ✅",
    "toast.sent":"تم الإرسال ✅",
    "toast.fail":"تعذر الإرسال الآن — جرّب لاحقًا.",
    "toast.missing":"لازم تضيف رابط Formspree أولاً.",
    "toast.themeDark":"الوضع الداكن 🌙",
    "toast.themeLight":"الوضع الفاتح ☀️",
  },
  en: {
    dir: "ltr", lang: "en", toggle: "العربية",
    "brand.sub": "Portfolio",
    "nav.home":"Home", "nav.highlights":"Highlights", "nav.work":"Work", "nav.contact":"Contact",
    "nav.cv":"CV", "nav.theme":"Theme",

    "hero.eyebrow":"DATA • EXECUTION • IMPACT",
    "hero.title":"Abdullah Alomran",
    "hero.subtitle":"Execution-first and KPI-driven. I turn data into clear decisions using SQL and Power BI — and build portfolio-ready projects.",
    "hero.cta1":"Work", "hero.cta2":"Contact", "hero.copy":"Copy email",
    "hero.badge":"Data Analytics",
    "hero.cardTitle":"Quick Glimpse",
    "hero.cardTag":"Clear • Practical • Consistent",
    "hero.line1k":"Focus", "hero.line1v":"Analytics → Data Science",
    "hero.line2k":"Style", "hero.line2v":"KPI-driven reporting",
    "hero.line3k":"Links", "hero.cv":"Download CV", "hero.more":"Highlights",

    "hl.title":"Highlights",
    "hl.desc":"A quick snapshot of how Abdullah works and what he brings.",
    "hl.c1t":"Decision-first", "hl.c1d":"Start from the decision, then the KPI.",
    "hl.c2t":"Clean execution", "hl.c2d":"Structured work, clear docs, clean outputs.",
    "hl.c3t":"Portfolio-ready", "hl.c3d":"Projects built to be shown — not just described.",

    "work.title":"Work",
    "work.desc":"Selected projects — launching soon with full writeups.",
    "work.p1t":"Executive Dashboard", "work.p1d":"KPIs + insights for decision-makers.",
    "work.p2t":"SQL Analytics Pack", "work.p2d":"A structured set of real analytics queries.",
    "work.p3t":"Data Cleaning Pipeline", "work.p3d":"Quality checks + weekly-ready exports.",
    "work.soon":"Soon to be deployed!",
    "work.repo":"Repo", "work.demo":"Preview",

    "contact.title":"Contact",
    "contact.desc":"Send a message — it reaches my inbox.",
    "contact.name":"Name", "contact.email":"Email", "contact.msg":"Message", "contact.send":"Send",
    "contact.connectTitle":"Connect", "contact.connectDesc":"Prefer social? Use the links below.",
    "contact.top":"Back to top ↑",

    "footer.highlights":"Highlights", "footer.work":"Work", "footer.contact":"Contact",

    "toast.copied":"Email copied ✅",
    "toast.sent":"Message sent ✅",
    "toast.fail":"Couldn’t send right now. Try again later.",
    "toast.missing":"Add your Formspree endpoint first.",
    "toast.themeDark":"Dark mode 🌙",
    "toast.themeLight":"Light mode ☀️",
  }
};

function applyLanguage(code){
  const t = dict[code];
  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;

  if (langBtn) langBtn.textContent = t.toggle;
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
if (langBtn) langBtn.addEventListener("click", toggleLanguage);
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

/* Reveal */
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
const sectionIds = ["home","highlights","work","contact"];
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

/* Contact form */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("mvzbyjdk")){
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
