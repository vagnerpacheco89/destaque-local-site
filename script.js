const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

const syncHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && menu) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}
