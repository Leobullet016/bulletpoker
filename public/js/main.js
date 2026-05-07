(function () {
  'use strict';

  /* --- Accordion --- */
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(trigger.getAttribute('aria-controls'));
        if (!panel) return;
        trigger.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
    });
  }

  /* --- Count-up --- */
  function formatNumber(val, fmt) {
    return fmt === 'thousands' ? val.toLocaleString('pt-BR') : String(val);
  }

  function runCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    var target   = parseInt(el.getAttribute('data-target'), 10);
    var prefix   = el.getAttribute('data-prefix')  || '';
    var suffix   = el.getAttribute('data-suffix')  || '';
    var fmt      = el.getAttribute('data-format')  || '';
    var duration = 1800;
    var startTs  = null;

    function tick(ts) {
      if (!startTs) startTs = ts;
      var progress = Math.min((ts - startTs) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + formatNumber(Math.round(eased * target), fmt) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function initCountUp() {
    var counters = Array.prototype.slice.call(
      document.querySelectorAll('.stat-number[data-target]')
    );
    if (!counters.length) return;

    function tryTrigger() {
      if (isInViewport(counters[0])) {
        counters.forEach(runCounter);
        window.removeEventListener('scroll', tryTrigger);
      }
    }

    window.addEventListener('scroll', tryTrigger, { passive: true });
    tryTrigger();
    setTimeout(tryTrigger, 300);
  }

  /* --- QR Modal — intercepts clicks on /criar-conta links --- */
  function initQrModal() {
    if (document.getElementById('qr-modal')) return;

    var overlay = document.createElement('div');
    overlay.id = 'qr-modal';
    overlay.className = 'qr-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'qr-modal-title');
    overlay.hidden = true;
    overlay.innerHTML = ''
      + '<div class="qr-modal__backdrop" data-qr-close></div>'
      + '<div class="qr-modal__box" role="document">'
      +   '<button type="button" class="qr-modal__close" aria-label="Fechar" data-qr-close>'
      +     '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +       '<circle cx="12" cy="12" r="10" />'
      +       '<line x1="15" y1="9" x2="9" y2="15" />'
      +       '<line x1="9" y1="9" x2="15" y2="15" />'
      +     '</svg>'
      +   '</button>'
      +   '<h2 id="qr-modal-title" class="qr-modal__title">Baixe o<br />aplicativo</h2>'
      +   '<div class="qr-modal__code">'
      +     '<img src="/images/23639bd5e19f240d29b863381045ed5630ce9b81.png" alt="QR code para baixar o aplicativo Bullet" />'
      +   '</div>'
      +   '<p class="qr-modal__caption">Escaneie o código para baixar o aplicativo</p>'
      + '</div>';

    document.body.appendChild(overlay);

    function open() {
      overlay.hidden = false;
      document.body.classList.add('qr-modal-open');
      var closeBtn = overlay.querySelector('.qr-modal__close');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      overlay.hidden = true;
      document.body.classList.remove('qr-modal-open');
    }

    var DOWNLOAD_URL = 'https://pro.bullet.cash/download-bullet-cash';
    var MOBILE_BREAKPOINT = 768;

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('a[href="/criar-conta"], a[href="/qr"]');
      if (trigger) {
        e.preventDefault();
        if (window.innerWidth < MOBILE_BREAKPOINT) {
          window.location.href = DOWNLOAD_URL;
        } else {
          open();
        }
        return;
      }
      if (e.target.closest('[data-qr-close]')) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) close();
    });
  }

  /* --- Mobile menu (hamburger drawer) --- */
  function initMobileMenu() {
    var headerInner = document.querySelector('.site-header .header-inner');
    if (!headerInner || document.querySelector('.menu-toggle')) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-drawer');
    toggle.innerHTML = ''
      + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +   '<line x1="4" y1="7"  x2="20" y2="7" />'
      +   '<line x1="4" y1="12" x2="20" y2="12" />'
      +   '<line x1="4" y1="17" x2="20" y2="17" />'
      + '</svg>';
    headerInner.appendChild(toggle);

    var drawer = document.createElement('div');
    drawer.id = 'mobile-drawer';
    drawer.className = 'mobile-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Menu');
    drawer.hidden = true;
    drawer.innerHTML = ''
      + '<div class="mobile-drawer__backdrop" data-drawer-close></div>'
      + '<div class="mobile-drawer__panel" role="document">'
      +   '<button type="button" class="mobile-drawer__close" aria-label="Fechar menu" data-drawer-close>'
      +     '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +       '<line x1="6" y1="6"  x2="18" y2="18" />'
      +       '<line x1="18" y1="6" x2="6"  y2="18" />'
      +     '</svg>'
      +   '</button>'
      +   '<nav class="mobile-drawer__nav" aria-label="Navegação móvel">'
      +     '<a href="/"           class="mobile-drawer__link">Bullet Cash</a>'
      +     '<a href="/bullet-pro" class="mobile-drawer__link">Bullet Pro</a>'
      +     '<a href="/news"       class="mobile-drawer__link">News</a>'
      +   '</nav>'
      +   '<div class="mobile-drawer__cta">'
      +     '<a href="/criar-conta" class="btn-primary">Criar minha conta</a>'
      +   '</div>'
      + '</div>';
    document.body.appendChild(drawer);

    function open() {
      drawer.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    }

    function close() {
      drawer.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    }

    toggle.addEventListener('click', open);

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-drawer-close]') || e.target.closest('.mobile-drawer__link')) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && !drawer.hidden) close();
    });
  }

  /* --- Init --- */
  function init() {
    initAccordion();
    initCountUp();
    initQrModal();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* fallback: re-check once all images are laid out */
  window.addEventListener('load', function () {
    document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
      if (isInViewport(el)) runCounter(el);
    });
  });

}());
