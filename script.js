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

/* Hero — asset premium de mapa urbano, apenas abaixo da navbar. */
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (hero && heroVisual) {
  const mapStyles = document.createElement('style');
  mapStyles.textContent = `
    .site-header,
    .site-header.is-scrolled {
      background: rgba(5,5,5,.97);
      border-bottom-color: rgba(255,255,255,.075);
    }

    .hero.hero-map-asset {
      background: #050505 !important;
      isolation: isolate;
    }

    .hero.hero-map-asset::before,
    .hero.hero-map-asset::after {
      content: none !important;
    }

    .hero-map-asset .hero-grid-overlay,
    .hero-map-asset .hero-route {
      display: none !important;
    }

    .hero-map-photo {
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      background:
        url('assets/hero-map-premium-hq.webp') center center / cover no-repeat,
        #080808;
    }

    .hero-map-photo::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          90deg,
          rgba(0,0,0,.985) 0%,
          rgba(0,0,0,.97) 20%,
          rgba(0,0,0,.91) 34%,
          rgba(0,0,0,.74) 48%,
          rgba(0,0,0,.42) 62%,
          rgba(0,0,0,.16) 78%,
          rgba(0,0,0,.03) 100%
        ),
        linear-gradient(
          180deg,
          rgba(0,0,0,.10) 0%,
          transparent 20%,
          transparent 72%,
          rgba(0,0,0,.18) 100%
        );
    }

    .hero-map-orange-glow {
      position: absolute;
      z-index: 1;
      right: 4%;
      top: 31%;
      width: 40vw;
      height: 48vh;
      pointer-events: none;
      background: radial-gradient(circle, rgba(255,75,0,.06), transparent 66%);
      filter: blur(10px);
    }

    .hero-map-asset .hero-shell {
      position: relative;
      z-index: 2;
    }

    .hero-map-asset .hero-copy {
      position: relative;
      z-index: 3;
    }

    .hero-map-asset .hero-visual {
      position: relative;
      z-index: 3;
      min-height: 470px;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .hero-location-marker {
      position: relative;
      width: 92px;
      height: 116px;
      color: var(--orange);
      transform: translate(10%, -32%);
      filter: drop-shadow(0 20px 32px rgba(255,75,0,.34));
    }

    .hero-location-marker::before {
      content: '';
      position: absolute;
      z-index: -1;
      left: 50%;
      top: 46%;
      width: 174px;
      height: 174px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid rgba(255,75,0,.20);
      box-shadow:
        0 0 0 42px rgba(255,75,0,.022),
        0 0 0 82px rgba(255,75,0,.010);
    }

    .hero-location-marker::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -15px;
      width: 70px;
      height: 18px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: rgba(255,75,0,.23);
      filter: blur(11px);
    }

    .hero-location-marker svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    @media (max-width: 1060px) {
      .hero-map-photo {
        background-position: 64% center;
      }

      .hero-map-photo::after {
        background:
          linear-gradient(
            180deg,
            rgba(0,0,0,.96) 0%,
            rgba(0,0,0,.90) 44%,
            rgba(0,0,0,.58) 70%,
            rgba(0,0,0,.30) 100%
          );
      }

      .hero-map-asset .hero-visual {
        min-height: 320px;
      }

      .hero-location-marker {
        width: 78px;
        height: 100px;
      }
    }

    @media (max-width: 700px) {
      .hero-location-marker {
        transform: translate(10%, -2%);
      }

      .hero-map-photo {
        top: 0;
        background-position: 68% center;
      }

      .hero-map-photo::after {
        background:
          linear-gradient(
            180deg,
            rgba(0,0,0,.965) 0%,
            rgba(0,0,0,.93) 26%,
            rgba(0,0,0,.84) 54%,
            rgba(0,0,0,.62) 76%,
            rgba(0,0,0,.40) 100%
          ),
          linear-gradient(
            90deg,
            rgba(0,0,0,.72) 0%,
            rgba(0,0,0,.50) 58%,
            rgba(0,0,0,.22) 100%
          );
      }

      .hero-location-marker::before {
        width: 128px;
        height: 128px;
        box-shadow: 0 0 0 30px rgba(255,75,0,.02);
      }
    }
  `;
  document.head.appendChild(mapStyles);

  hero.classList.add('hero-map-asset');

  const mapPhoto = document.createElement('div');
  mapPhoto.className = 'hero-map-photo';
  mapPhoto.setAttribute('aria-hidden', 'true');

  const glow = document.createElement('div');
  glow.className = 'hero-map-orange-glow';
  glow.setAttribute('aria-hidden', 'true');

  hero.prepend(mapPhoto);
  hero.appendChild(glow);

  heroVisual.setAttribute('aria-label', 'Mapa urbano em dark mode representando a presença local do negócio');
  heroVisual.innerHTML = `
    <div class="hero-location-marker" aria-hidden="true">
      <svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 6C31.8 6 9 28.8 9 57c0 38.8 51 84 51 84s51-45.2 51-84C111 28.8 88.2 6 60 6Z" fill="currentColor"/>
        <circle cx="60" cy="57" r="18" fill="#080808"/>
      </svg>
    </div>
  `;
}
