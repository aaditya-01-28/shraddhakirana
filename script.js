/* ============================================================
   SHRADDHA KIRANA & GENERAL STORES
   JavaScript: Language, Fixed Nav, Hero Carousel, Gallery & UX
   ============================================================ */

/* ---- DATA DEFINITIONS (DEFINED FIRST TO PREVENT TDZ ERRORS) ---- */
const heroSlidesData = [
  { mr: 'दुकान मुख्य प्रवेशद्वार', en: 'Store Main Entrance' },
  { mr: 'आतील किराणा शेल्फ व माल', en: 'Inside Grocery Shelves & Stock' },
  { mr: 'काउंटर व बिलिंग विभाग', en: 'Billing & Service Counter' },
  { mr: 'दुकानाचा उद्घाटन समारंभ', en: 'Store Grand Opening' }
];

const galleryImages = [
  { src: 'images/shop1.jpg', mr: 'दुकानाचे मुख्य प्रवेशद्वार', en: 'Main Store Entrance', cat: 'store' },
  { src: 'images/shop2.jpg', mr: 'आतील किराणा शेल्फ व माल', en: 'Store Grocery Shelves & Stock', cat: 'store' },
  { src: 'images/shop3.jpg', mr: 'काउंटर व बिलिंग विभाग', en: 'Counter & Billing Area', cat: 'store' },
  { src: 'images/shop4.jpg', mr: 'उद्घाटन समारंभ', en: 'Grand Opening Ceremony', cat: 'store' },
  { src: 'images/grains&pulses.png', mr: 'धान्य आणि डाळी (बासमती तांदूळ, तूर डाळ, मसूर डाळ)', en: 'Grains & Pulses (Basmati Rice, Toor Dal, Masoor Dal)', cat: 'product' },
  { src: 'images/CookingOils&Ghee.png', mr: 'खाद्यतेल आणि गावठी तूप (सोयाबीन, सूर्यफूल, शेंगदाणा तेल)', en: 'Edible Oils & Pure Cow Ghee (Soybean, Sunflower, Groundnut)', cat: 'product' },
  { src: 'images/Spices & Dry Fruits.png', mr: 'मसाले आणि ड्रायफ्रूट्स (हळद, मिरची, गरम मसाला, काजू-बदाम)', en: 'Spices & Dry Fruits (Turmeric, Chilli, Garam Masala, Almonds)', cat: 'product' },
  { src: 'images/Tea, Coffee & Breakfas.png', mr: 'चहा, कॉफी आणि नाश्ता (आसाम चहा, फिल्टर कॉफी, बिस्किटे)', en: 'Tea, Coffee & Breakfast (Assam Tea, Filter Coffee, Marie)', cat: 'product' },
  { src: 'images/Dairy & Milk.png', mr: 'दूध आणि दुग्धजन्य पदार्थ (ताजे दूध, पनीर, दही, बटर)', en: 'Milk & Fresh Dairy Products (Fresh Milk, Paneer, Curd, Butter)', cat: 'product' },
  { src: 'images/Cold Drinks & Beverages.png', mr: 'थंड पेये आणि ज्यूस (पेप्सी, ७अप, फँटा, सोड्याच्या बाटल्या)', en: 'Cold Beverages & Juices (Pepsi, 7UP, Fanta, Juices)', cat: 'product' },
  { src: 'images/Home Cleaning & Hygiene.png', mr: 'घरगुती स्वच्छता साहित्य (डिटर्जंट, साबण, क्लिनर्स)', en: 'Home Cleaning & Hygiene (Detergent Powders, Soaps, Cleaners)', cat: 'product' },
];

let currentHeroIndex = 0;
let heroTimer = null;
let currentLbIndex = 0;

/* ---- HERO CAROUSEL CONTROLLER ---- */
function setHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  currentHeroIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroIndex);
  });

  updateHeroCaption();
  resetHeroTimer();
}

function heroNav(dir) {
  setHeroSlide(currentHeroIndex + dir);
}

function updateHeroCaption() {
  const heroCaptionEl = document.getElementById('heroCaption');
  if (!heroCaptionEl || !Array.isArray(heroSlidesData) || !heroSlidesData[currentHeroIndex]) return;
  const isEn = document.body.classList.contains('lang-en');
  heroCaptionEl.innerHTML = `<span class="mr">${heroSlidesData[currentHeroIndex].mr}</span><span class="en hidden">${heroSlidesData[currentHeroIndex].en}</span>`;
  if (isEn) {
    const mr = heroCaptionEl.querySelector('.mr');
    const en = heroCaptionEl.querySelector('.en');
    if (mr) mr.style.display = 'none';
    if (en) en.classList.remove('hidden');
  }
}

function startHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    heroNav(1);
  }, 3800); // Automatically rotates every 3.8s
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  startHeroTimer();
}

/* ---- GALLERY CONTROLLER ---- */
function switchMain(index) {
  if (!Array.isArray(galleryImages) || !galleryImages[index]) return;
  const mainImg = document.getElementById('galleryMain');

  if (mainImg) {
    mainImg.style.opacity = '0.35';
    setTimeout(() => {
      mainImg.src = galleryImages[index].src;
      mainImg.alt = galleryImages[index].mr;
      mainImg.style.opacity = '1';
    }, 120);
  }
  currentLbIndex = index;
  updateGalleryFeaturedLabel();

  document.querySelectorAll('.gallery-thumb').forEach((t) => {
    const thumbIdx = parseInt(t.getAttribute('data-index') ?? '-1', 10);
    t.classList.toggle('active', thumbIdx === index);
  });
}

function updateGalleryFeaturedLabel() {
  const label = document.getElementById('galleryFeaturedLabel');
  if (label && Array.isArray(galleryImages) && galleryImages[currentLbIndex]) {
    const isEn = document.body.classList.contains('lang-en');
    label.innerHTML = `<span class="mr">${galleryImages[currentLbIndex].mr}</span><span class="en hidden">${galleryImages[currentLbIndex].en}</span>`;
    if (isEn) {
      const mr = label.querySelector('.mr');
      const en = label.querySelector('.en');
      if (mr) mr.style.display = 'none';
      if (en) en.classList.remove('hidden');
    }
  }
  const cap = document.getElementById('lbCaption');
  if (cap && Array.isArray(galleryImages) && galleryImages[currentLbIndex]) {
    const isEn = document.body.classList.contains('lang-en');
    cap.textContent = isEn ? galleryImages[currentLbIndex].en : galleryImages[currentLbIndex].mr;
  }
}

// When thumbnail is clicked on index.html:
// If already selected, open full lightbox; otherwise show it in main preview
function showGalleryImage(index, thumbEl) {
  if (currentLbIndex === index) {
    openLightbox(index);
  } else {
    switchMain(index);
  }
}

// Open lightbox directly from product card
function openProductLightbox(index) {
  switchMain(index);
  openLightbox(index);
}

// Gallery Category Filter (All / Store / Products)
function filterGallery(category, btnEl) {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach(thumb => {
    const thumbCat = thumb.getAttribute('data-cat');
    if (category === 'all' || thumbCat === category) {
      thumb.style.display = '';
      thumb.classList.remove('hidden-filter');
    } else {
      thumb.style.display = 'none';
      thumb.classList.add('hidden-filter');
    }
  });
}

function openLightbox(index) {
  if (index === undefined || index === null) index = currentLbIndex;
  currentLbIndex = (index + galleryImages.length) % galleryImages.length;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (!lb || !img) return;

  const isEn = document.body.classList.contains('lang-en');
  img.src = galleryImages[currentLbIndex].src;
  img.alt = isEn ? galleryImages[currentLbIndex].en : galleryImages[currentLbIndex].mr;
  if (cap) {
    cap.textContent = isEn ? galleryImages[currentLbIndex].en : galleryImages[currentLbIndex].mr;
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target && e.target.id !== 'lightbox' && !e.target.closest('.lb-close')) {
    return;
  }
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
  switchMain(currentLbIndex);
}

function lbNav(e, dir) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  currentLbIndex = (currentLbIndex + dir + galleryImages.length) % galleryImages.length;
  openLightbox(currentLbIndex);
}

// Lightbox keyboard navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNav(e, 1);
  if (e.key === 'ArrowLeft') lbNav(e, -1);
});

/* ---- LANGUAGE CONTROLLER ---- */
function setLang(lang) {
  const isEn = lang === 'en';
  document.body.classList.toggle('lang-en', isEn);

  const btnMr = document.getElementById('btn-mr');
  const btnEn = document.getElementById('btn-en');
  if (btnMr) btnMr.classList.toggle('active', !isEn);
  if (btnEn) btnEn.classList.toggle('active', isEn);

  sessionStorage.setItem('sk_lang', isEn ? 'en' : 'mr');
  localStorage.setItem('sk_lang', isEn ? 'en' : 'mr');
  document.documentElement.lang = isEn ? 'en' : 'mr';

  // Update dynamic captions safely
  updateHeroCaption();
  updateGalleryFeaturedLabel();
}

// Strict default to Marathi across all pages on initial load
(function () {
  const sessionLang = sessionStorage.getItem('sk_lang');
  if (sessionLang === 'en') {
    setLang('en');
  } else {
    setLang('mr');
  }
})();

/* ---- MOBILE MENU TOGGLE ---- */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  if (links) links.classList.toggle('open');
}
function closeMenu() {
  const links = document.getElementById('nav-links');
  if (links) links.classList.remove('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navbar');
  if (nav && !nav.contains(e.target)) {
    closeMenu();
  }
});

/* ---- NAVBAR SCROLL ELEVATION ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ---- HERO CAROUSEL SWIPE & BUTTON LISTENERS ---- */
(function initHero() {
  const carouselContainer = document.getElementById('heroCarousel');
  if (!carouselContainer) return;

  // Auto-advance hero carousel continuously
  startHeroTimer();

  // Attach direct click events to hero nav buttons for bulletproof responsiveness
  const prevBtn = carouselContainer.querySelector('.hero-prev');
  const nextBtn = carouselContainer.querySelector('.hero-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      heroNav(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      heroNav(1);
    });
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchStartY = 0;

  carouselContainer.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  carouselContainer.addEventListener('touchend', (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Detect horizontal swipe with vertical threshold guard
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      heroNav(diffX > 0 ? 1 : -1);
    }
  }, { passive: true });

  // Mouse drag support for desktop swipe
  let isDragging = false;
  let mouseStartX = 0;
  let mouseStartY = 0;

  carouselContainer.addEventListener('mousedown', (e) => {
    if (e.target.closest('button, a, input')) return;
    isDragging = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const mouseEndX = e.clientX;
    const mouseEndY = e.clientY;
    const diffX = mouseStartX - mouseEndX;
    const diffY = mouseStartY - mouseEndY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      heroNav(diffX > 0 ? 1 : -1);
    }
  });
})();

/* ---- LIGHTBOX TOUCH SWIPE SUPPORT ---- */
(function initLightboxSwipe() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  let lbStartX = 0;
  let lbStartY = 0;

  lb.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length === 0) return;
    lbStartX = e.touches[0].clientX;
    lbStartY = e.touches[0].clientY;
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const lbEndX = e.changedTouches[0].clientX;
    const lbEndY = e.changedTouches[0].clientY;
    const diffX = lbStartX - lbEndX;
    const diffY = lbStartY - lbEndY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      lbNav(e, diffX > 0 ? 1 : -1);
    }
  }, { passive: true });
})();

/* ---- ACTIVE NAV LINK OBSERVER ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          const href = a.getAttribute('href');
          a.classList.toggle('active-nav', href === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ---- SCROLL TO TOP BUTTON ---- */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
});

/* ---- SCROLL REVEAL ANIMATIONS ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.feature-card, .product-card, .contact-card, .about-text, .why-choose'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  revealObserver.observe(el);
});

const animStyle = document.createElement('style');
animStyle.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(animStyle);

/* ---- PRODUCT CATEGORY FILTER (products.html) ---- */
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const targetBtn = document.querySelector(`.filter-btn[data-target="${cat}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }

  const groups = document.querySelectorAll('.product-category-group');
  groups.forEach(group => {
    if (cat === 'all' || group.getAttribute('data-cat') === cat) {
      group.style.display = 'block';
    } else {
      group.style.display = 'none';
    }
  });
}

// Auto filter products based on URL parameter (?cat=...)
(function() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    window.addEventListener('DOMContentLoaded', () => {
      filterProducts(cat);
    });
  }
})();
