(function () {
  const root = document.documentElement;
  const dict = window.I18N || {};
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* sin almacenamiento */ }
    },
  };

  let lang = 'es';
  const t = (key) => (dict[lang] && dict[lang][key]) || (dict.es && dict.es[key]) || '';

  /* ---------- Idioma ---------- */
  const langToggle = document.getElementById('lang-toggle');

  function applyLanguage(next) {
    lang = dict[next] ? next : 'es';
    root.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    // Solo cadenas propias de i18n.js, nunca contenido externo
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = t(el.dataset.i18nHtml);
      if (value) el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const value = t(key);
        if (attr && value) el.setAttribute(attr, value);
      });
    });

    document.title = t('meta.title');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t('meta.description');

    langToggle.textContent = t('lang.next');
    langToggle.setAttribute('aria-label', t('lang.switch'));
    langToggle.lang = lang === 'es' ? 'en' : 'es';

    updateThemeLabel();
  }

  function initialLanguage() {
    const saved = storage.get('lang');
    if (saved && dict[saved]) return saved;
    const browser = (navigator.language || 'es').toLowerCase();
    return /^(es|ca|gl|eu)/.test(browser) ? 'es' : 'en';
  }

  langToggle.addEventListener('click', () => {
    const next = lang === 'es' ? 'en' : 'es';
    storage.set('lang', next);
    applyLanguage(next);
  });

  /* ---------- Tema ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function updateThemeLabel() {
    const isDark = root.dataset.theme !== 'light';
    themeToggle.setAttribute('aria-label', t(isDark ? 'theme.toLight' : 'theme.toDark'));
    if (themeColor) themeColor.content = isDark ? '#0b0d0c' : '#f3f2ec';
  }

  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    storage.set('theme', next);
    updateThemeLabel();
  });

  // Si el usuario no ha elegido tema, seguimos al sistema
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (storage.get('theme')) return;
    root.dataset.theme = e.matches ? 'light' : 'dark';
    updateThemeLabel();
  });

  /* ---------- Menú móvil ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 52.01rem)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Cabecera y sección activa ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === '#' + entry.target.id;
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));
  }

  /* ---------- Imágenes pendientes → marcador de posición ---------- */
  document.querySelectorAll('.media img').forEach((img) => {
    const markMissing = () => img.closest('.media').classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) markMissing();
    else img.addEventListener('error', markMissing, { once: true });
  });

  /* ---------- Copiar correo ---------- */
  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');
  let copyTimer;

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyStatus.textContent = t('contact.copied');
    } catch (e) {
      copyStatus.textContent = t('contact.copyFail');
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 2500);
  });

  /* ---------- Animaciones de entrada ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    // Pequeño escalonado entre elementos hermanos
    reveals.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.setProperty('--delay', Math.min(index, 6) * 0.07 + 's');
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Arranque ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  applyLanguage(initialLanguage());
})();
