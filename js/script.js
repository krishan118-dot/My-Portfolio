/* ==========================================================================
   N. KRISHAN TANTIA — PORTFOLIO SCRIPT
   Modular vanilla JS: nav, mobile menu, scroll reveal, typing effect,
   counters, skill bars, circuit background, back-to-top, contact form.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCircuitBackground();
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initSmoothScroll();
  initScrollReveal();
  initTypingEffect();
  initCounters();
  initSkillBars();
  initBackToTop();
  initContactForm();
});

/* ---------- Animated circuit-trace background ---------- */
function initCircuitBackground(){
  const mount = document.querySelector('.circuit-bg');
  if(!mount) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1440 900');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'traceGradient');
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
  const stops = [
    ['0%', '#22d3ee'], ['50%', '#3b82f6'], ['100%', '#a855f7']
  ];
  stops.forEach(([offset, color]) => {
    const stop = document.createElementNS(svgNS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', color);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  svg.appendChild(defs);

  // Generate a loose grid of orthogonal "PCB trace" paths
  const paths = [
    'M 0 120 H 300 V 260 H 620 V 80 H 980 V 300 H 1440',
    'M 0 420 H 200 V 520 H 540 V 400 H 900 V 560 H 1200 V 420 H 1440',
    'M 0 700 H 380 V 620 H 700 V 760 H 1050 V 660 H 1440',
    'M 120 0 V 180 H 420 V 900',
    'M 1300 0 V 240 H 1040 V 620 H 1440',
    'M 0 40 H 140 V 900'
  ];

  paths.forEach((d, i) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'trace');
    path.dataset.index = i;
    svg.appendChild(path);
  });

  mount.appendChild(svg);

  // Traveling pulse dots along a few of the paths
  const pulseCount = 6;
  for(let i = 0; i < pulseCount; i++){
    const pathEl = svg.querySelectorAll('.trace')[i % paths.length];
    const len = pathEl.getTotalLength();
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', 3);
    dot.setAttribute('class', 'node');
    svg.appendChild(dot);

    const duration = 6000 + Math.random() * 6000;
    const delay = Math.random() * duration;
    let start = null;

    function animate(ts){
      if(start === null) start = ts - delay;
      const elapsed = (ts - start) % duration;
      const progress = elapsed / duration;
      const point = pathEl.getPointAtLength(progress * len);
      dot.setAttribute('cx', point.x);
      dot.setAttribute('cy', point.y);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
}

/* ---------- Navbar background on scroll ---------- */
function initNavbarScroll(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  const toggle = () => {
    if(window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu(){
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.menu-overlay');
  if(!burger || !menu || !overlay) return;

  function closeMenu(){
    burger.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu(){
    burger.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
}

/* ---------- Highlight active nav link based on current page ---------- */
function initActiveNavLink(){
  const current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')){
      link.classList.add('active');
    }
  });
}

/* ---------- Smooth scroll for in-page anchors ---------- */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if(id.length < 2) return;
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Scroll reveal (fade-in on scroll) ---------- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((item, i) => {
    item.style.setProperty('--i', i % 8);
    observer.observe(item);
  });
}

/* ---------- Typing effect for hero role text ---------- */
function initTypingEffect(){
  const el = document.querySelector('[data-typing]');
  if(!el) return;
  const roles = JSON.parse(el.dataset.typing);
  let roleIndex = 0, charIndex = 0, deleting = false;

  const textSpan = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.textContent = '';
  el.appendChild(textSpan);
  el.appendChild(cursor);

  function tick(){
    const current = roles[roleIndex];
    if(!deleting){
      textSpan.textContent = current.slice(0, ++charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      textSpan.textContent = current.slice(0, --charIndex);
      if(charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 70);
  }
  tick();
}

/* ---------- Animated counters for stats ---------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if(!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const decimals = el.dataset.counter.includes('.') ? el.dataset.counter.split('.')[1].length : 0;
      const duration = 1400;
      const startTime = performance.now();

      function frame(now){
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + (el.dataset.suffix || '');
        if(progress < 1) requestAnimationFrame(frame);
        else el.textContent = target.toFixed(decimals) + (el.dataset.suffix || '');
      }
      requestAnimationFrame(frame);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- Skill progress bars ---------- */
function initSkillBars(){
  const bars = document.querySelectorAll('.skill-bar-fill');
  if(!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.style.width = el.dataset.level + '%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ---------- Back to top button ---------- */
function initBackToTop(){
  const btn = document.querySelector('.back-to-top');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    if(window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Contact form (front-end only) ---------- */
function initContactForm(){
  const form = document.querySelector('#contact-form');
  if(!form) return;
  const status = document.querySelector('#form-status');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    if(!name){
      status.textContent = 'Please fill in your name before sending.';
      return;
    }
    status.textContent = `Thanks, ${name.split(' ')[0]} — your message is ready to send. Connect a backend or mail service to deliver it.`;
    form.reset();
  });
}
