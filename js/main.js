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
document.querySelectorAll('.news-form').forEach((form) => {
  form.action = 'https://jpx1pk-fk.myshopify.com/contact#newsletter';
  form.method = 'post';
  const email = form.querySelector('input[type="email"]');
  if (email) email.name = 'contact[email]';
  [['form_type', 'customer'], ['utf8', '✓'], ['contact[tags]', 'newsletter,waitlist']].forEach(([n, v]) => {
    const h = document.createElement('input');
    h.type = 'hidden'; h.name = n; h.value = v;
    form.appendChild(h);
  });
});
