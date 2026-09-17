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

/* Hero visual — mapa abstrato da presença local. Mantém o lado esquerdo intacto. */
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  const mapStyles = document.createElement('style');
  mapStyles.textContent = `
    .hero-visual {
      min-height: 470px;
      display: grid;
      place-items: center;
    }

    .hero-map-stage {
      position: relative;
      width: min(100%, 560px);
      aspect-ratio: 1.08 / 1;
      overflow: hidden;
      border-radius: 32px;
      background: #090909;
      border: 1px solid rgba(255,255,255,.075);
      box-shadow:
        0 38px 90px rgba(0,0,0,.42),
        inset 0 1px 0 rgba(255,255,255,.025);
      isolation: isolate;
    }

    .hero-map-stage::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      background:
        radial-gradient(circle at 50% 48%, rgba(255,75,0,.13), transparent 23%),
        linear-gradient(90deg, rgba(5,5,5,.72) 0%, transparent 24%, transparent 78%, rgba(5,5,5,.68) 100%),
        linear-gradient(180deg, rgba(5,5,5,.42), transparent 24%, transparent 76%, rgba(5,5,5,.52));
    }

    .hero-map-stage::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      border-radius: inherit;
      box-shadow: inset 0 0 100px rgba(0,0,0,.52);
    }

    .hero-map-art {
      position: absolute;
      inset: -3%;
      width: 106%;
      height: 106%;
      opacity: .95;
      transform: rotate(-2deg) scale(1.04);
    }

    .hero-map-pin {
      position: absolute;
      z-index: 5;
      left: 50%;
      top: 50%;
      width: 88px;
      height: 110px;
      transform: translate(-50%, -58%);
      color: var(--orange);
      filter: drop-shadow(0 18px 28px rgba(255,75,0,.28));
    }

    .hero-map-pin::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -18px;
      width: 70px;
      height: 20px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: rgba(255,75,0,.18);
      filter: blur(10px);
    }

    .hero-map-pin svg {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
      height: 100%;
    }

    .hero-map-pulse {
      position: absolute;
      z-index: 4;
      left: 50%;
      top: 50%;
      width: 170px;
      height: 170px;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(255,75,0,.2);
      border-radius: 50%;
      box-shadow:
        0 0 0 42px rgba(255,75,0,.035),
        0 0 0 84px rgba(255,75,0,.018);
    }

    @media (max-width: 1060px) {
      .hero-map-stage {
        width: min(92vw, 620px);
        aspect-ratio: 1.3 / 1;
      }
      .hero-map-pin {
        width: 76px;
        height: 96px;
      }
    }

    @media (max-width: 700px) {
      .hero-map-stage {
        width: 100%;
        border-radius: 24px;
      }
      .hero-map-pulse {
        width: 120px;
        height: 120px;
      }
    }
  `;
  document.head.appendChild(mapStyles);

  heroVisual.setAttribute('aria-label', 'Mapa abstrato representando a presença local do negócio');
  heroVisual.innerHTML = `
    <div class="hero-map-stage" aria-hidden="true">
      <svg class="hero-map-art" viewBox="0 0 800 620" role="presentation" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0d0d0d"/>
            <stop offset=".52" stop-color="#151515"/>
            <stop offset="1" stop-color="#090909"/>
          </linearGradient>
          <linearGradient id="roadOrange" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#ff4b00" stop-opacity="0"/>
            <stop offset=".25" stop-color="#ff4b00" stop-opacity=".48"/>
            <stop offset=".72" stop-color="#ff4b00" stop-opacity=".68"/>
            <stop offset="1" stop-color="#ff4b00" stop-opacity="0"/>
          </linearGradient>
          <filter id="roadGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="800" height="620" fill="url(#mapBg)"/>

        <g fill="#111" stroke="#242424" stroke-width="2">
          <path d="M-20 24 145 8l44 92-56 92-153 14Z"/>
          <path d="m200-10 158 28 35 95-63 74-146-31-28-87Z"/>
          <path d="m406 0 188 8 38 82-74 86-138-27-53-78Z"/>
          <path d="m620-5 192 12-8 164-108 19-78-69Z"/>
          <path d="M-18 224 112 190l92 56-15 111-112 50-91-66Z"/>
          <path d="m214 207 132-27 86 70-17 115-148 34-78-65Z"/>
          <path d="m449 188 142-4 71 70-15 118-142 23-92-70Z"/>
          <path d="m670 194 142-18 8 170-78 66-93-54Z"/>
          <path d="M-10 427 108 397l104 64-21 159H-12Z"/>
          <path d="m226 414 152-27 73 78-39 155H198Z"/>
          <path d="m460 411 143-24 80 65-10 168H428Z"/>
          <path d="m688 425 124-38 12 233H676Z"/>
        </g>

        <g fill="none" stroke="#303030" stroke-width="4" stroke-linecap="round" opacity=".92">
          <path d="M-40 124C92 161 144 90 261 135s208 27 286-31 173-29 294 8"/>
          <path d="M-30 314c103-83 202-41 288 8s176 30 271-20 196-14 301 45"/>
          <path d="M55-40c55 120 12 196 61 278s41 162-17 240-37 129-3 190"/>
          <path d="M328-25c-18 101 44 160 32 257s-74 144-35 242 31 120 4 190"/>
          <path d="M608-30c-59 115 2 195-22 283s-13 158 34 229 47 110 28 166"/>
        </g>

        <g fill="none" stroke="#222" stroke-width="2" opacity=".9">
          <path d="M10 76 202 259 349 211 514 388 782 267"/>
          <path d="M23 506 190 353 338 519 502 330 772 522"/>
          <path d="M126 20 252 181 426 67 581 224 776 102"/>
          <path d="M64 590 217 480 374 596 537 468 738 601"/>
        </g>

        <g fill="none" stroke="url(#roadOrange)" stroke-linecap="round" filter="url(#roadGlow)">
          <path d="M-45 376C102 315 183 349 284 398s194 54 300-17 159-85 281-43" stroke-width="5"/>
          <path d="M172-30c8 121-32 183 5 281s101 141 85 262-10 121 17 155" stroke-width="3" opacity=".72"/>
        </g>

        <g fill="#1b1b1b" opacity=".85">
          <circle cx="98" cy="278" r="5"/><circle cx="235" cy="113" r="4"/>
          <circle cx="558" cy="150" r="5"/><circle cx="704" cy="345" r="4"/>
          <circle cx="127" cy="500" r="5"/><circle cx="514" cy="503" r="5"/>
        </g>
      </svg>

      <div class="hero-map-pulse"></div>
      <div class="hero-map-pin">
        <svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 6C31.8 6 9 28.8 9 57c0 38.8 51 84 51 84s51-45.2 51-84C111 28.8 88.2 6 60 6Z" fill="currentColor"/>
          <circle cx="60" cy="57" r="18" fill="#080808"/>
        </svg>
      </div>
    </div>
  `;
}
