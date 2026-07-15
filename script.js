  const translations = {
    mn: {
      logo: "О. Тэмүжин",
      page_title: "Орхон Тэмүжин",
      hero_intro_strong: "Би бол Орxоны Тэмүжин.",
      hero_intro_body: "Энэ хуудасанд миний судалгааны ажил ба надтай холбогдох арга зүй байгаа.",
      hero_view_work: "Ажил харах",
      hero_get_in_touch: "Холбоо барих",
      about_title: "Надын талаар",
      about_p1: "Би Калифорнийн Беркли Их Сургууль-д докторын (PhD) оюутан бөгөөд квант химийн чиглэлээр судалгаа хийхийг зорьж байна.",
      about_p2: "Би саяхан Массачусетсийн Технологийн Дээд Сургуулийг (MIT) Хими & Биологи, мөн Физикийн чиглэлээр хос бакалаврын (B.S.) зэрэгтэй төгссөн. Бакалаврын хугацаандаа молекулын электрон бүтцийн арга боловсруулах, органик хувиргалт хийх алгоритмын дизайн, химийн шинж чанаруудын хиймэл оюун ухаанаар сурах зэрэг олон төрлийн судалгааны төслүүдэд оролцсон.",
      about_p3: "Мөн би MIT-ийн органик, квант, физик химийн хичээлийн туслаx багш болж, давтлагын хичээл удирдан заах, зөвлөх ажилын туршлагатай.",
      about_p4: "Химийн хичээлээс гадна би програм хангамж боловсруулах, вэб дизайн хийх сонирхолтой. Би вэб хуудас болон химийн программ хангамж бүтээх туршлагатай бөгөөд энэ чиглэлээр ур чадвараа үргэлжлүүлэн хөгжүүлэхээр төлөвлөж байна",
      work_title: "Судалгааны ажил",
      contact_title: "Холбоо барих",
      contact_lede: "Надтай холбогдох хамгийн хурдан арга бол имэйлээр холбогдох юм. Хэрэв таньд гадаадын иx сургууль ба докторын сургуульд өргөдөл явуулаx, хиймийн олимпиадад бэлдэx, шинжлэx ухаан математикийн хичээлийн тусламж хэрэгтэй бол надтай цагийн 20к-аар уулзах боломжтой ",
      contact_button: "Имэйл илгээх",
      contact_name_label: "Нэр",
      contact_email_label: "Имэйл",
      view_project: "Төслийг харах →",
      in_prep: "Бичигдэж байгаа",
      cal_button: "Уулзалт товлох",
    }
  };

  const calConfig = {
  en: { link: "temujin-orkhon/60min-en", namespace: "60min-en" },
  mn: { link: "temujin-orkhon/60min-mn", namespace: "60min-mn" }
};

  let currentLanguage = localStorage.getItem("site-language") || "en";
  const originalEnglish = {};

  function updateLanguageSwitcher() {
    const toggleButton = document.getElementById("language-switcher");
    if (!toggleButton) return;

    toggleButton.setAttribute("aria-pressed", currentLanguage === "mn" ? "true" : "false");
    toggleButton.setAttribute("aria-label", currentLanguage === "en" ? "Switch to Mongolian" : "Switch to English");
    toggleButton.setAttribute("title", currentLanguage === "en" ? "Switch to Mongolian" : "Switch to English");
  }

  function captureOriginalEnglish() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      originalEnglish[element.dataset.i18n] = element.textContent;
    });
    originalEnglish.pageTitle = document.title;
  }

  function applyTranslations() {
    if (currentLanguage === "mn") {
      const strings = translations.mn;
      document.documentElement.lang = "mn";
      document.title = strings.page_title;

      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = strings[element.dataset.i18n];
        if (typeof value === "string") {
          element.textContent = value;
        }
      });
    } else {
      document.documentElement.lang = "en";
      document.title = originalEnglish.pageTitle;

      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (originalEnglish[key]) {
          element.textContent = originalEnglish[key];
        }
      });
    }
    const calBtn = document.querySelector("[data-cal-link]");
    const cfg = calConfig[currentLanguage] || calConfig.en;
    calBtn.setAttribute("data-cal-link", cfg.link);
    calBtn.setAttribute("data-cal-namespace", cfg.namespace);
    updateLanguageSwitcher();
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "mn" : "en";
    localStorage.setItem("site-language", currentLanguage);
    applyTranslations();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  captureOriginalEnglish();
  applyTranslations();
  document.getElementById("language-switcher")?.addEventListener("click", toggleLanguage);

  // Hero background: floating molecule network
  (function () {
    const canvas = document.getElementById("molecule-bg");
    const hero = canvas ? canvas.closest(".hero") : null;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const styles = getComputedStyle(document.documentElement);
    const lineColor = styles.getPropertyValue("--ink-dim").trim() || "#93A0AB";
    const dotColor = styles.getPropertyValue("--accent").trim() || "#1F6F50";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = null;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const newWidth = hero.clientWidth;
      const newHeight = hero.clientHeight;
      const widthChanged = Math.abs(newWidth - width) > 1;

      width = newWidth;
      height = newHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (widthChanged || particles.length === 0) {
        // Real resize (rotation, window resize) — regenerate the layout.
        initParticles();
      } else {
        // Height-only change (e.g. mobile browser address bar hiding while
        // scrolling) — keep existing particles, just clamp them into bounds
        // instead of respawning, so nothing visibly jumps.
        particles.forEach((p) => {
          p.x = Math.min(p.x, width);
          p.y = Math.min(p.y, height);
        });
      }
    }

    function initParticles() {
      const count = Math.max(24, Math.min(70, Math.round((width * height) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 3 + Math.random() * 1.6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(140, width / 6);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.globalAlpha = (1 - dist / linkDist) * 0.35;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.55;
      ctx.fillStyle = dotColor;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function step() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
      draw();
      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (prefersReducedMotion) {
        draw(); // single static frame, no motion
        return;
      }
      if (!rafId) rafId = requestAnimationFrame(step);
    }

    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    resize();
    start();
  })();
