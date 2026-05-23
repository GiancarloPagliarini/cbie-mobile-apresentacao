/* ============================================================
   CBIE Mobile · Deck JS
   Slide navigation + GSAP animations per slide
   ============================================================ */

(function () {
  'use strict';

  const slides   = Array.from(document.querySelectorAll('.slide'));
  const steps    = Array.from(document.querySelectorAll('.step'));
  const prevBtn  = document.getElementById('navPrev');
  const nextBtn  = document.getElementById('navNext');
  const scCur    = document.querySelector('.sc-current');
  const scTotal  = document.querySelector('.sc-total');

  const total = slides.length;
  let current = 0;
  let isAnimating = false;

  scTotal.textContent = String(total).padStart(2, '0');

  // ----------------------------------------------------------
  // Animações de entrada por slide
  // ----------------------------------------------------------
  const animators = {
    cover(slide) {
      const reveals = slide.querySelectorAll('.reveal');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(slide.querySelector('.cover-tag'), { y: 20, opacity: 0, duration: 0.7 })
        .from(reveals, { y: 60, opacity: 0, duration: 0.9, stagger: 0.10 }, '-=0.3')
        .from(slide.querySelector('.cover-phone-stage'), {
          x: 100, opacity: 0, rotateY: -30, duration: 1.1, ease: 'power3.out'
        }, '-=1.0');
    },

    login(slide) {
      const phone = slide.querySelector('.phone');
      const inputs = slide.querySelectorAll('.input');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(slide.querySelector('.side-tag'),  { y: 20, opacity: 0, duration: 0.6 })
        .from(slide.querySelector('.side-title'), { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(slide.querySelector('.side-desc'),  { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(slide.querySelectorAll('.side-list li'), { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .from(phone, { x: 120, opacity: 0, rotateY: -25, duration: 1.0 }, '-=1.0')
        .from(slide.querySelector('.login-hero'), { y: -20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(slide.querySelector('.login-title'), { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(slide.querySelector('.login-sub'),   { y: 10, opacity: 0, duration: 0.4 }, '-=0.3')
        .from(inputs, { y: 14, opacity: 0, duration: 0.5, stagger: 0.10 }, '-=0.2')
        .from(slide.querySelector('.login-btn'),  { y: 14, opacity: 0, duration: 0.5 }, '-=0.2')
        .from(slide.querySelector('.login-bio'),  { y: 14, opacity: 0, duration: 0.4 }, '-=0.3');
    },

    dashboard(slide) {
      const phone = slide.querySelector('.phone');
      const bars  = slide.querySelectorAll('.bar');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(slide.querySelector('.side-tag'),   { y: 20, opacity: 0, duration: 0.6 })
        .from(slide.querySelector('.side-title'),  { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(slide.querySelector('.side-desc'),   { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(slide.querySelectorAll('.side-list li'), { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .from(phone, { x: 120, opacity: 0, rotateY: -25, duration: 1.0 }, '-=1.0')
        .from(slide.querySelector('.dash-header'), { y: -20, opacity: 0, duration: 0.5 }, '-=0.5')
        .from(slide.querySelectorAll('.kpi'),      { y: 24, opacity: 0, duration: 0.6, stagger: 0.10 }, '-=0.3')
        .from(slide.querySelector('.dash-chart-card'), { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .add(() => {
          bars.forEach(bar => {
            const h = bar.getAttribute('data-h') || '50';
            bar.style.height = h + '%';
          });
        }, '-=0.2')
        .from(slide.querySelectorAll('.mini'),     { y: 20, opacity: 0, duration: 0.5, stagger: 0.10 }, '-=0.1')
        .from(slide.querySelector('.dash-tabs'),   { y: 30, opacity: 0, duration: 0.5 }, '-=0.3');

      // Reset bars on exit
      slide._resetBars = () => bars.forEach(b => b.style.height = '0%');
    },

    notifications(slide) {
      const phone   = slide.querySelector('.phone');
      const notifs  = slide.querySelectorAll('.notif');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(slide.querySelector('.side-tag'),   { y: 20, opacity: 0, duration: 0.6 })
        .from(slide.querySelector('.side-title'),  { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(slide.querySelector('.side-desc'),   { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(slide.querySelectorAll('.side-list li'), { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .from(phone, { x: 120, opacity: 0, rotateY: -25, duration: 1.0 }, '-=1.0')
        .from(slide.querySelector('.lock-time'),  { y: -20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from(notifs, {
          y: -40,
          opacity: 0,
          scale: 0.9,
          duration: 0.55,
          stagger: 0.18,
          ease: 'back.out(1.4)'
        }, '-=0.3');
    },

    chat(slide) {
      const phone = slide.querySelector('.phone');
      const msgs  = slide.querySelectorAll('.msg');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(slide.querySelector('.side-tag'),   { y: 20, opacity: 0, duration: 0.6 })
        .from(slide.querySelector('.side-title'),  { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(slide.querySelector('.side-desc'),   { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(slide.querySelectorAll('.chat-feat-item'), { y: 20, opacity: 0, duration: 0.5, stagger: 0.10 }, '-=0.3')
        .from(phone, { x: 120, opacity: 0, rotateY: -25, duration: 1.0 }, '-=1.0')
        .from(slide.querySelector('.chat-header'), { y: -20, opacity: 0, duration: 0.5 }, '-=0.5')
        .from(slide.querySelector('.chat-day'),    { opacity: 0, duration: 0.4 }, '-=0.3')
        .from(msgs, {
          y: 20,
          opacity: 0,
          scale: 0.92,
          duration: 0.55,
          stagger: 0.45,
          ease: 'back.out(1.3)'
        }, '-=0.2')
        .from(slide.querySelector('.chat-input'),  { y: 30, opacity: 0, duration: 0.5 }, '-=0.4');
    }
  };

  // ----------------------------------------------------------
  // Goto slide
  // ----------------------------------------------------------
  let lockTimer = null;
  function go(index, opts) {
    if (index < 0 || index >= total) return;
    if (index === current && !(opts && opts.force)) return;
    if (isAnimating) return;

    isAnimating = true;
    if (lockTimer) clearTimeout(lockTimer);

    const outgoing = slides[current];
    const incoming = slides[index];

    // Reset bars no slide saindo
    if (outgoing && typeof outgoing._resetBars === 'function') {
      outgoing._resetBars();
    }

    // Saída
    outgoing.classList.remove('active');
    outgoing.classList.add('exit');

    setTimeout(() => {
      outgoing.classList.remove('exit');
    }, 700);

    // Entrada
    incoming.classList.add('active');

    // Atualiza steps (classe is-active)
    steps.forEach((s, i) => s.classList.toggle('is-active', i === index));

    // Atualiza contador
    scCur.textContent = String(index + 1).padStart(2, '0');

    // Atualiza prev/next state
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;

    current = index;

    // Mata tweens em andamento + limpa estilos inline GSAP no slide incoming
    // (evita elementos ficarem presos com opacity 0 quando navegação é rápida)
    const animTargets = incoming.querySelectorAll(
      '.cover-tag, .reveal, .cover-desc, .cover-meta-item, .cover-phone-stage, ' +
      '.side-tag, .side-title, .side-desc, .side-list li, .side-card, ' +
      '.phone, .login-hero, .login-title, .login-sub, .input, .login-btn, .login-bio, ' +
      '.dash-header, .kpi, .dash-chart-card, .mini, .dash-tabs, ' +
      '.lock-time, .notif, ' +
      '.chat-header, .chat-day, .msg, .chat-input, .chat-feat-item'
    );
    gsap.killTweensOf(animTargets);
    gsap.set(animTargets, { clearProps: 'opacity,transform,x,y,scale,rotateX,rotateY' });

    // Dispara animações do slide ativo (síncrono = sem flash)
    const key = incoming.dataset.slide;
    if (key && animators[key]) {
      animators[key](incoming);
    }

    lockTimer = setTimeout(() => { isAnimating = false; }, 550);
  }

  // ----------------------------------------------------------
  // Event listeners
  // ----------------------------------------------------------
  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      const target = parseInt(step.dataset.go, 10);
      if (!isNaN(target)) go(target);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      go(current + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      go(current - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(total - 1);
    }
  });

  // Wheel scroll (com debounce)
  let wheelLock = false;
  document.addEventListener('wheel', (e) => {
    if (wheelLock) return;
    if (Math.abs(e.deltaY) < 30) return;
    wheelLock = true;
    if (e.deltaY > 0) go(current + 1);
    else go(current - 1);
    setTimeout(() => { wheelLock = false; }, 950);
  }, { passive: true });

  // Touch / swipe
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) go(current + 1);
    else go(current - 1);
  }, { passive: true });

  // ----------------------------------------------------------
  // Phone tilt parallax (mouse follow)
  // ----------------------------------------------------------
  document.addEventListener('mousemove', (e) => {
    const phones = document.querySelectorAll('.slide.active .phone-tilt');
    if (!phones.length) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xRel = (e.clientX / w - 0.5) * 2;
    const yRel = (e.clientY / h - 0.5) * 2;
    phones.forEach((p) => {
      const baseY = -12, baseX = 4;
      gsap.to(p, {
        rotateY: baseY + xRel * 6,
        rotateX: baseX - yRel * 4,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  });

  // ----------------------------------------------------------
  // Boot: dispara animações do slide 0
  // ----------------------------------------------------------
  prevBtn.disabled = true;
  nextBtn.disabled = total <= 1;

  // Bars começam em 0 para animar
  document.querySelectorAll('.bar').forEach(b => b.style.height = '0%');

  // Roda animator do slide 0 IMEDIATAMENTE (GSAP .from imediato = sem flash)
  const firstSlide = slides[0];
  const firstKey   = firstSlide.dataset.slide;
  if (firstKey && animators[firstKey]) {
    animators[firstKey](firstSlide);
  }

  // Revela body após pintar uma vez
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });

})();
