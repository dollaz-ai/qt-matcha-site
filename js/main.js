// qt matcha — shared interactions

// mobile nav
const burger = document.querySelector('.hamburger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => links.classList.toggle('show'));
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    // close others
    document.querySelectorAll('.faq-item.open').forEach((o) => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// newsletter + discount popup → real Shopify customer capture (waitlist)
// Posts into a hidden iframe so the visitor never leaves the page,
// then shows an inline confirmation. Shopify processes the POST server-side.
(() => {
  const sink = document.createElement('iframe');
  sink.name = 'qt-capture-sink';
  sink.style.display = 'none';
  sink.setAttribute('aria-hidden', 'true');
  document.body.appendChild(sink);

  // ---- discount popup (skip subscribe.html, which already has a waitlist form) ----
  // TEMPORARILY DISABLED: Shopify /contact capture is returning "invalid parameters"
  // and the confirmation can't detect failure, so we don't want to tell visitors
  // they're subscribed when they may not be. Flip POPUP_ENABLED back to true once a
  // clean real signup is confirmed landing in Shopify → Customers.
  const POPUP_ENABLED = false;
  const onSubscribePage = !!document.getElementById('waitlist-form');
  if (POPUP_ENABLED && !onSubscribePage) buildPopup();

  function buildPopup() {
    const style = document.createElement('style');
    style.textContent = `
      .qt-pop-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
        background:rgba(35,79,32,.55);backdrop-filter:blur(3px);padding:20px;
        opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;}
      .qt-pop-overlay.open{opacity:1;visibility:visible;}
      .qt-pop-card{position:relative;width:min(440px,100%);background:var(--cream);border-radius:var(--radius-lg,32px);
        padding:38px 34px 30px;box-shadow:0 24px 60px rgba(35,79,32,.28);text-align:center;
        transform:translateY(16px) scale(.97);transition:transform .3s cubic-bezier(.2,.8,.2,1);
        border:3px solid var(--pink-pale);}
      .qt-pop-overlay.open .qt-pop-card{transform:translateY(0) scale(1);}
      .qt-pop-close{position:absolute;top:14px;right:16px;background:none;border:none;cursor:pointer;
        font-size:1.5rem;line-height:1;color:var(--green-dark);opacity:.5;padding:4px;}
      .qt-pop-close:hover{opacity:1;}
      .qt-pop-tag{display:inline-block;font-family:var(--font-display);font-weight:700;font-size:.8rem;
        color:var(--pink-hot);letter-spacing:.04em;text-transform:lowercase;margin-bottom:8px;}
      .qt-pop-card h3{font-family:var(--font-display);font-weight:800;color:var(--green-dark);
        font-size:1.7rem;line-height:1.05;margin:0 0 10px;}
      .qt-pop-card h3 .hl{color:var(--pink-hot);}
      .qt-pop-sub{font-family:var(--font-body);font-weight:600;color:var(--green-deep);font-size:.98rem;
        margin:0 0 20px;opacity:.9;}
      .qt-pop-form{display:flex;flex-direction:column;gap:10px;}
      .qt-pop-form input[type=email]{width:100%;padding:14px 18px;border-radius:var(--radius-pill,999px);
        border:2px solid var(--pink-pale);font-family:var(--font-body);font-weight:600;font-size:1rem;
        background:#fff;color:var(--green-dark);}
      .qt-pop-form input[type=email]:focus{outline:3px solid var(--pink-hot);border-color:var(--pink-hot);}
      .qt-pop-form button{padding:14px 18px;border-radius:var(--radius-pill,999px);border:none;cursor:pointer;
        background:var(--pink-hot);color:#fff;font-family:var(--font-display);font-weight:700;font-size:1.05rem;
        transition:transform .15s ease,background .15s ease;}
      .qt-pop-form button:hover{transform:translateY(-1px);background:#e85a99;}
      .qt-pop-fine{font-family:var(--font-body);font-size:.72rem;color:var(--green-deep);opacity:.65;margin:12px 0 0;}
      .qt-pop-dismiss{background:none;border:none;cursor:pointer;font-family:var(--font-body);font-weight:600;
        font-size:.8rem;color:var(--green-deep);opacity:.55;margin-top:12px;text-decoration:underline;}
      .qt-pop-dismiss:hover{opacity:.85;}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'qt-pop-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Join the qt club for 15% off');
    overlay.innerHTML = `
      <div class="qt-pop-card">
        <button class="qt-pop-close" aria-label="Close">&times;</button>
        <span class="qt-pop-tag">🌸 the qt club</span>
        <h3><span class="hl">15% off</span> your first order</h3>
        <p class="qt-pop-sub">We're almost ready to pour. Join the list and we'll email your 15%-off code the day we launch — plus first dibs on flavors &amp; iron-friendly recipes.</p>
        <form class="news-form qt-pop-form" data-tags="newsletter,waitlist,popup" data-success="you're in — your 15% code lands in your inbox at launch 🍵">
          <input type="email" placeholder="your email, qt" required aria-label="Email address">
          <button type="submit">save my 15% →</button>
        </form>
        <p class="qt-pop-fine">One email at launch. No spam, skip anytime.</p>
        <button class="qt-pop-dismiss" type="button">no thanks, I'll pay full price</button>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => { overlay.classList.remove('open'); };
    overlay.querySelector('.qt-pop-close').addEventListener('click', close);
    overlay.querySelector('.qt-pop-dismiss').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    // after a successful signup, linger on the confirmation then close
    overlay.querySelector('.qt-pop-form').addEventListener('submit', () => {
      setTimeout(close, 2800);
    });

    // show once per visitor, ~10s after load
    try {
      if (!localStorage.getItem('qt_popup_seen')) {
        setTimeout(() => {
          overlay.classList.add('open');
          try { localStorage.setItem('qt_popup_seen', '1'); } catch (e) {}
        }, 10000);
      }
    } catch (e) {
      // localStorage blocked (private mode) — show once this session anyway
      setTimeout(() => overlay.classList.add('open'), 10000);
    }
  }

  // ---- wire every .news-form (page forms + popup) to Shopify capture ----
  document.querySelectorAll('.news-form').forEach((form) => {
    form.action = 'https://jpx1pk-fk.myshopify.com/contact#newsletter';
    form.method = 'post';
    form.target = 'qt-capture-sink';
    const email = form.querySelector('input[type="email"]');
    if (email) email.name = 'contact[email]';
    const tags = form.dataset.tags || 'newsletter,waitlist';
    const success = form.dataset.success || "you’re on the list — welcome to the qt club! 🍵";
    [['form_type', 'customer'], ['utf8', '✓'], ['contact[tags]', tags]].forEach(([n, v]) => {
      const h = document.createElement('input');
      h.type = 'hidden'; h.name = n; h.value = v;
      form.appendChild(h);
    });
    form.addEventListener('submit', () => {
      // let the native submission fire into the hidden iframe, then confirm inline
      setTimeout(() => {
        form.innerHTML = '<p style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;color:var(--green-dark);">' + success + '</p>';
      }, 400);
    });
  });
})();
