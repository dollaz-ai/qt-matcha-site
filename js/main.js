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

// newsletter (demo only)
document.querySelectorAll('.news-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input && input.value.trim()) {
      form.innerHTML = '<p style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;color:var(--green-dark);">you’re on the list — welcome to the qt club! 🍵</p>';
    }
  });
});
