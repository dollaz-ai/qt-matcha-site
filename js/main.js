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

// newsletter → real Shopify customer capture (waitlist)
// Posts into a hidden iframe so the visitor never leaves the page,
// then shows an inline confirmation. Shopify processes the POST server-side.
(() => {
  const sink = document.createElement('iframe');
  sink.name = 'qt-capture-sink';
  sink.style.display = 'none';
  sink.setAttribute('aria-hidden', 'true');
  document.body.appendChild(sink);

  document.querySelectorAll('.news-form').forEach((form) => {
    form.action = 'https://jpx1pk-fk.myshopify.com/contact#newsletter';
    form.method = 'post';
    form.target = 'qt-capture-sink';
    const email = form.querySelector('input[type="email"]');
    if (email) email.name = 'contact[email]';
    [['form_type', 'customer'], ['utf8', '✓'], ['contact[tags]', 'newsletter,waitlist']].forEach(([n, v]) => {
      const h = document.createElement('input');
      h.type = 'hidden'; h.name = n; h.value = v;
      form.appendChild(h);
    });
    form.addEventListener('submit', () => {
      // let the native submission fire into the hidden iframe, then confirm inline
      setTimeout(() => {
        form.innerHTML = '<p style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;color:var(--green-dark);">you’re on the list — welcome to the qt club! 🍵</p>';
      }, 400);
    });
  });
})();
