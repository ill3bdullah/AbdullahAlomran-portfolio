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

/* ✅ Formspree endpoint */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzbyjdk";

/* Language */
const langBtn = document.getElementById("langToggle");
const langMobile = document.getElementById("langToggleMobile");
let current = "en"; // start in English (your screenshots show English)

const dict = {
  ar: {
    dir: "rtl", lang: "ar", toggle: "English",
    "brand.sub":"Portfolio",
    "nav.home":"الرئيسية", "nav.highlights":"لمحة", "nav.work":"أعمال", "nav.contact":"تواصل",
    "nav.cv":"CV", "nav.menuLabel":"القائمة",

    "hero.eyebrow":"DATA • EXECUTION • IMPACT",
    "hero.title":"عبدالله العمران",
    "hero.subtitle":"أنا طالب علوم حاسب أحب أبني أشياء مفيدة. أرتّب البيانات، أطلع منها معنى، وأعرضها بشكل واضح يساعد على اتخاذ قرار.",
    "hero.cta1":"الأعمال", "hero.cta2":"تواصل", "hero.copy":"نسخ الإيميل",
    "hero.badge":"تحليل البيانات",
    "hero.cardTitle":"لمحة سريعة",
    "hero.cardTag":"Clear • Practical • Consistent",
    "hero.line1k":"التركيز", "hero.line1v":"Analytics → Data Science",
    "hero.line2k":"الأسلوب", "hero.line2v":"KPI-driven reporting",
    "hero.line3k":"روابط", "hero.cv":"تحميل CV", "hero.more":"لمحة",

    "hl.title":"لمحة سريعة",
    "hl.desc":"هنا أعطيك فكرة سريعة عن طريقتي بالشغل والنتائج اللي أركز عليها.",
    "hl.c1t":"Decision-first", "hl.c1d":"أبدأ من الهدف، بعدها أحدد الـ KPI، ثم أشتغل على التحليل.",
    "hl.c2t":"Clean execution", "hl.c2d":"شغل مرتب: تنظيم، توثيق، وخطوات واضحة.",
    "hl.c3t":"Portfolio-ready", "hl.c3d":"أحب أطلع بنتيجة قابلة للعرض… مو بس كلام.",

    "work.title":"الأعمال",
    "work.desc":"هذه الأعمال اللي أشتغل عليها — قريبًا بتنزل بتفاصيل كاملة.",
    "work.p1t":"Executive Dashboard", "work.p1d":"KPIs + insights designed for decision-makers.",
    "work.p2t":"SQL Analytics Pack", "work.p2d":"A structured set of real analytics queries.",
    "work.p3t":"Data Cleaning Pipeline", "work.p3d":"Quality checks + export weekly-ready datasets.",
    "work.soon":"قريبًا بتنزل جاهزة!",
    "work.repo":"Repo", "work.demo":"Preview",

    "contact.title":"تواصل",
    "contact.desc":"إذا عندك سؤال أو فرصة تعاون — اكتب لي هنا.",
    "contact.name":"الاسم", "contact.email":"البريد", "contact.msg":"الرسالة", "contact.send":"إرسال",
    "contact.connectTitle":"Connect", "contact.connectDesc":"وتقدر بعد تزور حساباتي هنا.",
    "contact.top":"للأعلى ↑",

    "footer.highlights":"لمحة", "footer.work":"أعمال", "footer.contact":"تواصل",

    "toast.copied":"تم نسخ الإيميل ✅",
    "toast.sent":"تم الإرسال ✅",
    "toast.fail":"تعذر الإرسال الآن — جرّب لاحقًا."
  },
  en: {
    dir: "ltr", lang: "en", toggle: "العربية",
    "brand.sub":"Portfolio",
    "nav.home":"Home", "nav.highlights":"Highlights", "nav.work":"Work", "nav.contact":"Contact",
    "nav.cv":"CV", "nav.menuLabel":"Menu",

    "hero.eyebrow":"DATA • EXECUTION • IMPACT",
    "hero.title":"Abdullah Alomran",
    "hero.subtitle":"I’m a Computer Science student who likes building useful things. I organize data, extract meaning, and present it clearly so decisions become easier.",
    "hero.cta1":"Work", "hero.cta2":"Contact", "hero.copy":"Copy email",
    "hero.badge":"Data Analytics",
    "hero.cardTitle":"Quick Glimpse",
    "hero.cardTag":"Clear • Practical • Consistent",
    "hero.line1k":"Focus", "hero.line1v":"Analytics → Data Science",
    "hero.line2k":"Style", "hero.line2v":"KPI-driven reporting",
    "hero.line3k":"Links", "hero.cv":"Download CV", "hero.more":"Highlights",

    "hl.title":"Highlights",
    "hl.desc":"Here’s the quick version of how I work and what I care about.",
    "hl.c1t":"Decision-first", "hl.c1d":"I start with the goal, define the KPI, then build the analysis around it.",
    "hl.c2t":"Clean execution", "hl.c2d":"Organized workflow, clear documentation, and clean outputs.",
    "hl.c3t":"Portfolio-ready", "hl.c3d":"I focus on results that are showable — not just talk.",

    "work.title":"Work",
    "work.desc":"These are the projects I’m building — full writeups coming soon.",
    "work.p1t":"Executive Dashboard", "work.p1d":"KPIs + insights designed for decision-makers.",
    "work.p2t":"SQL Analytics Pack", "work.p2d":"A structured set of real analytics queries.",
    "work.p3t":"Data Cleaning Pipeline", "work.p3d":"Quality checks + weekly-ready exports.",
    "work.soon":"Soon to be deployed!",
    "work.repo":"Repo", "work.demo":"Preview",

    "contact.title":"Contact",
    "contact.desc":"Got a question or a collaboration idea? Send me a message here.",
    "contact.name":"Name", "contact.email":"Email", "contact.msg":"Message", "contact.send":"Send",
    "contact.connectTitle":"Connect", "contact.connectDesc":"You can also reach me through my profiles.",
    "contact.top":"Back to top ↑",

    "footer.highlights":"Highlights", "footer.work":"Work", "footer.contact":"Contact",

    "toast.copied":"Email copied ✅",
    "toast.sent":"Message sent ✅",
    "toast.fail":"Couldn’t send right now. Try again later."
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

/* Contact form -> Formspree */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
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
