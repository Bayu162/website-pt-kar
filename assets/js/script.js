// === Mobile navigation ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

function closeMobileNav(instant) {
  if (instant) {
    navMenu.style.transition = 'none';
    if (navOverlay) navOverlay.style.transition = 'none';
  }
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (instant) {
    // force a reflow so the instant close actually paints before we restore the transition
    void navMenu.offsetHeight;
    navMenu.style.transition = '';
    if (navOverlay) navOverlay.style.transition = '';
  }
}

function openMobileNav() {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  if (navOverlay) navOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    isOpen ? closeMobileNav(false) : openMobileNav();
  });

  // Links navigate to a new page immediately, so close instantly (no mid-transition
  // frame that could linger on screen or get captured while the next page loads).
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileNav(true));
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', () => closeMobileNav(false));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMobileNav(false);
  });

  // Belt-and-suspenders: if a page is restored from bfcache (e.g. via the back
  // button) always resume in the fully-closed state, never mid-animation.
  window.addEventListener('pageshow', () => closeMobileNav(true));
}

//auto-rotating photo slideshow (arrows + swipe + autoplay) ===
(function initCareerSlideshow() {
  const slideshow = document.getElementById('karierSlideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.career-slide'));
  const dots = Array.from(slideshow.querySelectorAll('.dot'));
  const prevBtn = slideshow.querySelector('.career-slideshow-arrow.prev');
  const nextBtn = slideshow.querySelector('.career-slideshow-arrow.next');
  if (!slides.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = 5000; // auto-advance every 5 seconds
  let current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) {
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');
    }
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) {
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() {
    if (prefersReducedMotion || timer) return;
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function restart() {
    stop();
    start();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      restart();
    });
  });

  // Manual navigation via arrow buttons
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

  // Manual navigation via keyboard when the slideshow is focused
  slideshow.setAttribute('tabindex', '0');
  slideshow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    else if (e.key === 'ArrowLeft') { prev(); restart(); }
  });

  // Manual navigation via swipe (touch) and drag (mouse)
  let dragStartX = null;
  let dragging = false;
  const swipeThreshold = 40; // px

  function dragStart(x) {
    dragStartX = x;
    dragging = true;
    stop();
  }

  function dragEnd(x) {
    if (!dragging || dragStartX === null) return;
    const delta = x - dragStartX;
    if (delta > swipeThreshold) prev();
    else if (delta < -swipeThreshold) next();
    dragging = false;
    dragStartX = null;
    start();
  }

  slideshow.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientX), { passive: true });
  slideshow.addEventListener('touchend', (e) => dragEnd(e.changedTouches[0].clientX));

  slideshow.addEventListener('mousedown', (e) => { e.preventDefault(); dragStart(e.clientX); });
  window.addEventListener('mouseup', (e) => { if (dragging) dragEnd(e.clientX); });

  // Pause on hover/focus so visitors can read/look without it jumping away.
  slideshow.addEventListener('mouseenter', stop);
  slideshow.addEventListener('mouseleave', () => { if (!dragging) start(); });
  slideshow.addEventListener('focusin', stop);
  slideshow.addEventListener('focusout', start);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  start();
})();

// === Back to top button ===
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// === Category filter (Ekosistem / Berita) ===
// Fungsi umum yang dipakai oleh tombol filter kategori di halaman
// pages/ekosistem.html (filter brand) dan pages/berita/index.html
// (filter berita). TIDAK PERLU diubah saat menambah brand/artikel/kategori
// baru — cukup pastikan atribut data-filter (tombol) dan data-category
// (kartu) di HTML sama persis, fungsi ini otomatis menyesuaikan.
function initFilter(filterSelector, itemSelector) {
  const buttons = document.querySelectorAll(filterSelector);
  const items = document.querySelectorAll(itemSelector);
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}
initFilter('.filter-brand', '.brand-item');
initFilter('.filter-berita', '.berita-item');

// === WhatsApp contact form -> opens WhatsApp with prefilled message ===
const waForm = document.getElementById('wa-form');
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('wa-nama').value.trim();
    const pesan = document.getElementById('wa-pesan').value.trim();
    // NOMOR TUJUAN FORM KONTAK CEPAT (pages/kontak.html).
    // PERHATIAN: nomor ini SENGAJA terpisah dari nomor WA tombol melayang/
    // footer/karier (lihat assets/js/footer.js, cari "6285269840834").
    // Pastikan dengan pembimbing/atasan apakah kedua nomor ini SEHARUSNYA
    // sama atau memang berbeda tim/tujuan, lalu samakan formatnya di sini:
    // 62 (kode negara) + nomor HP tanpa angka 0 di depan, tanpa +/spasi/strip.
    const nomor = '6282369597978'; // TODO: ganti dengan nomor WhatsApp resmi PT KAR
    const text = encodeURIComponent(`Halo PT KAR, saya ${nama}. ${pesan}`);
    window.open(`https://wa.me/${nomor}?text=${text}`, '_blank');
  });
}

// === Ekosistem: notifikasi untuk tautan yang masih belum tersedia (href="#") ===
(function initComingSoonLinks() {
  const links = document.querySelectorAll('.visit-link[href="#"]');
  if (!links.length) return;

  let toastEl = null;
  let hideTimer = null;

  function ensureToast() {
    if (toastEl) return toastEl;
    toastEl = document.createElement('div');
    toastEl.className = 'coming-soon-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
    return toastEl;
  }

  function showToast(message) {
    const el = ensureToast();
    el.textContent = message;
    el.classList.remove('show');
    void el.offsetWidth; // restart transisi jika diklik berulang kali
    el.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      let message = 'Maaf, tautan ini masih belum tersedia';
      if (link.classList.contains('visit-link--wa')) message = 'Maaf, WhatsApp masih belum tersedia';
      else if (link.classList.contains('visit-link--site')) message = 'Maaf, situs masih belum tersedia';
      else if (link.classList.contains('visit-link--ig')) message = 'Maaf, Instagram masih belum tersedia';
      showToast(message);
    });
  });
})();

// === Tombol Bagikan berita: Web Share API dengan fallback menu ===
(function initShareButtons() {
  const buttons = document.querySelectorAll('.share-btn');
  if (!buttons.length) return;

  let menuEl = null;

  function closeMenu() {
    if (menuEl) {
      menuEl.remove();
      menuEl = null;
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('resize', closeMenu);
    }
  }
  function onDocClick(e) {
    if (menuEl && !menuEl.contains(e.target) && !e.target.closest('.share-btn')) closeMenu();
  }

  function openFallbackMenu(anchorBtn, shareData) {
    closeMenu();
    menuEl = document.createElement('div');
    menuEl.className = 'share-menu';
    menuEl.innerHTML = `
      <a href="https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}" target="_blank" rel="noopener" class="share-menu-item"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}" target="_blank" rel="noopener" class="share-menu-item"><i class="fa-brands fa-facebook"></i> Facebook</a>
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}" target="_blank" rel="noopener" class="share-menu-item"><i class="fa-brands fa-x-twitter"></i> X (Twitter)</a>
      <button type="button" class="share-menu-item share-menu-copy"><i class="fa-solid fa-link"></i> Salin Tautan</button>
    `;
    document.body.appendChild(menuEl);

    const rect = anchorBtn.getBoundingClientRect();
    menuEl.style.top = (window.scrollY + rect.bottom + 8) + 'px';
    const left = Math.max(window.scrollX + 12, window.scrollX + rect.right - menuEl.offsetWidth);
    menuEl.style.left = left + 'px';

    menuEl.querySelector('.share-menu-copy').addEventListener('click', () => {
      const copyBtn = menuEl.querySelector('.share-menu-copy');
      navigator.clipboard?.writeText(shareData.url).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tautan disalin';
        setTimeout(closeMenu, 1200);
      }).catch(() => {});
    });

    setTimeout(() => {
      document.addEventListener('click', onDocClick);
      window.addEventListener('resize', closeMenu);
    }, 0);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const shareData = {
        title: btn.dataset.shareTitle || document.title,
        text: btn.dataset.shareText || document.title,
        url: window.location.href
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // AbortError saat pengguna membatalkan share; abaikan saja
        }
      } else {
        openFallbackMenu(btn, shareData);
      }
    });
  });
})();

// === Simple animated counters for stats ===
// Membuat angka statistik (.achieve-num) "berhitung naik" dari 0 ke angka
// aslinya saat pengunjung scroll sampai bagian tersebut. Fungsi ini
// membaca angka dari atribut data-count di HTML (index.html & capaian.html)
// secara otomatis — TIDAK PERLU diedit saat mengubah angka statistik,
// cukup ubah data-count di file HTML-nya.
function animateCounters(scope) {
  (scope || document).querySelectorAll('.achieve-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString('id-ID') + (el.dataset.suffix || '');
    }, 20);
  });
}
if ('IntersectionObserver' in window) {
  document.querySelectorAll('.achieve-band').forEach((section) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounters(entry.target); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    obs.observe(section);
  });
}

// === Smooth scroll-reveal animations ===
// Automatically fades/slides elements into view as the user scrolls down.
(function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Selectors of elements we want to animate in. Grouped items (cards, list
  // items, etc.) get a small staggered delay based on their position within
  // their parent group so they cascade in rather than popping in all at once.
  const groupSelectors = [
    '.card',
    '.value-card',
    '.doc-card',
    '.brand-item',
    '.berita-item',
    '.timeline-item',
    '.contact-info-item',
    '.logo-box',
    '.page-hero .container > *'
  ];
  const soloSelectors = [
    '.section-title',
    '.section-desc',
    '.image-frame',
    '.achieve-band'
  ];

  const groupNodes = new Set();
  groupSelectors.forEach(sel => {
    // Group elements by shared parent so stagger delays restart per group.
    const els = document.querySelectorAll(sel);
    const byParent = new Map();
    els.forEach(el => {
      if (!byParent.has(el.parentElement)) byParent.set(el.parentElement, []);
      byParent.get(el.parentElement).push(el);
    });
    byParent.forEach(siblings => {
      siblings.forEach((el, i) => {
        if (groupNodes.has(el)) return;
        groupNodes.add(el);
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 80, 400) + 'ms';
      });
    });
  });

  soloSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (groupNodes.has(el)) return;
      el.classList.add('reveal');
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in-view'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
})();


