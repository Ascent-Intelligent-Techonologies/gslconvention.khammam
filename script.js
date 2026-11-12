(function () {
  var doc = document.documentElement;
  var WHATSAPP = '919818936630';
  doc.classList.add('js');

  // Header: solid once the page is scrolled
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    doc.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setMenu(!doc.classList.contains('menu-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Enquiry form: compose a WhatsApp message
  var form = document.getElementById('enquiry');
  if (form) {
    var dateInput = form.elements.date;
    var today = new Date();
    dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var event = form.elements.event.value;
      var date = dateInput.value;
      var guests = form.elements.guests.value;

      var lines = ['Hi GSL Convention, I\'d like to enquire about booking the venue.', ''];
      if (name) lines.push('Name: ' + name);
      lines.push('Occasion: ' + event);
      if (date) {
        var d = new Date(date + 'T00:00:00');
        lines.push('Date: ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
      }
      if (guests) lines.push('Guests: ' + guests);

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
