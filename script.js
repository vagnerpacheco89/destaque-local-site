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

/* Hero — mapa detalhado ocupando todo o fundo, com leitura preservada à esquerda. */
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (hero && heroVisual) {
  const heroMapStyles = document.createElement('style');
  heroMapStyles.textContent = `
    .hero.hero-map-background {
      background:
        url('assets/hero-map-dark.svg') center center / cover no-repeat !important;
    }

    .hero.hero-map-background::before {
      content: '' !important;
      position: absolute !important;
      inset: 0 !important;
      width: auto !important;
      height: auto !important;
      right: auto !important;
      top: auto !important;
      z-index: 1 !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      pointer-events: none;
      background:
        linear-gradient(
          90deg,
          rgba(0,0,0,.985) 0%,
          rgba(0,0,0,.975) 24%,
          rgba(0,0,0,.93) 42%,
          rgba(0,0,0,.78) 56%,
          rgba(0,0,0,.52) 70%,
          rgba(0,0,0,.27) 100%
        ),
        radial-gradient(circle at 78% 48%, rgba(255,75,0,.10), transparent 24%);
    }

    .hero.hero-map-background::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background:
        linear-gradient(180deg, rgba(0,0,0,.20), transparent 26%, transparent 72%, rgba(0,0,0,.30)),
        radial-gradient(circle at 82% 50%, rgba(255,75,0,.08), transparent 20%);
    }

    .hero.hero-map-background .hero-grid-overlay,
    .hero.hero-map-background .hero-route {
      display: none !important;
    }

    .hero.hero-map-background .hero-shell {
      position: relative;
      z-index: 2;
    }

    .hero.hero-map-background .hero-copy {
      position: relative;
      z-index: 3;
    }

    .hero.hero-map-background .hero-visual {
      position: relative;
      min-height: 470px;
      display: grid;
      place-items: center;
      isolation: isolate;
      pointer-events: none;
    }

    .hero-location-marker {
      position: relative;
      width: 92px;
      height: 116px;
      color: var(--orange);
      transform: translateY(-4%);
      filter: drop-shadow(0 18px 28px rgba(255,75,0,.30));
    }

    .hero-location-marker::before {
      content: '';
      position: absolute;
      z-index: -1;
      left: 50%;
      top: 46%;
      width: 190px;
      height: 190px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid rgba(255,75,0,.23);
      box-shadow:
        0 0 0 44px rgba(255,75,0,.035),
        0 0 0 88px rgba(255,75,0,.015);
    }

    .hero-location-marker::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -16px;
      width: 72px;
      height: 18px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: rgba(255,75,0,.24);
      filter: blur(11px);
    }

    .hero-location-marker svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    @media (max-width: 1060px) {
      .hero.hero-map-background::before {
        background:
          linear-gradient(
            180deg,
            rgba(0,0,0,.97) 0%,
            rgba(0,0,0,.91) 47%,
            rgba(0,0,0,.58) 74%,
            rgba(0,0,0,.34) 100%
          ),
          radial-gradient(circle at 50% 82%, rgba(255,75,0,.08), transparent 22%);
      }

      .hero.hero-map-background {
        background-position: 62% center !important;
      }

      .hero.hero-map-background .hero-visual {
        min-height: 320px;
      }

      .hero-location-marker {
        width: 78px;
        height: 100px;
      }
    }

    @media (max-width: 700px) {
      .hero.hero-map-background {
        background-position: 68% center !important;
      }

      .hero-location-marker::before {
        width: 130px;
        height: 130px;
        box-shadow: 0 0 0 32px rgba(255,75,0,.026);
      }
    }
  `;
  document.head.appendChild(heroMapStyles);

  hero.classList.add('hero-map-background');
  heroVisual.setAttribute('aria-label', 'Mapa detalhado representando a presença local do negócio');
  heroVisual.innerHTML = `
    <div class="hero-location-marker" aria-hidden="true">
      <svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 6C31.8 6 9 28.8 9 57c0 38.8 51 84 51 84s51-45.2 51-84C111 28.8 88.2 6 60 6Z" fill="currentColor"/>
        <circle cx="60" cy="57" r="18" fill="#080808"/>
      </svg>
    </div>
  `;
}
