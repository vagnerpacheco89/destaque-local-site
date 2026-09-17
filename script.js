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

/* Hero — mapa urbano REAL em dark mode. O mapa começa abaixo da navbar. */
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (hero && heroVisual) {
  const mapStyles = document.createElement('style');
  mapStyles.textContent = `
    .site-header {
      background: #050505;
      border-bottom-color: rgba(255,255,255,.055);
    }

    .hero.hero-real-map {
      background: #050505 !important;
      isolation: isolate;
    }

    .hero.hero-real-map::before,
    .hero.hero-real-map::after {
      content: none !important;
    }

    .hero-real-map .hero-grid-overlay,
    .hero-real-map .hero-route {
      display: none !important;
    }

    .hero-map-live {
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      top: 82px;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;
      background: #101010;
    }

    .hero-map-live .leaflet-container {
      width: 100%;
      height: 100%;
      background: #101010;
      pointer-events: none !important;
    }

    .hero-map-live .leaflet-tile-pane {
      opacity: .96;
    }

    .hero-map-shade {
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 82px;
      bottom: 0;
      pointer-events: none;
      background:
        linear-gradient(
          90deg,
          rgba(0,0,0,.995) 0%,
          rgba(0,0,0,.99) 20%,
          rgba(0,0,0,.965) 36%,
          rgba(0,0,0,.90) 49%,
          rgba(0,0,0,.68) 61%,
          rgba(0,0,0,.36) 75%,
          rgba(0,0,0,.16) 100%
        ),
        linear-gradient(180deg, rgba(0,0,0,.12), transparent 25%, transparent 72%, rgba(0,0,0,.22));
    }

    .hero-map-orange-glow {
      position: absolute;
      z-index: 1;
      right: 4%;
      top: 30%;
      width: 42vw;
      height: 50vh;
      pointer-events: none;
      background: radial-gradient(circle, rgba(255,75,0,.075), transparent 64%);
      filter: blur(8px);
    }

    .hero-real-map .hero-shell {
      position: relative;
      z-index: 2;
    }

    .hero-real-map .hero-copy {
      position: relative;
      z-index: 3;
    }

    .hero-real-map .hero-visual {
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
      transform: translate(11%, -2%);
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
      border: 1px solid rgba(255,75,0,.22);
      box-shadow:
        0 0 0 42px rgba(255,75,0,.026),
        0 0 0 82px rgba(255,75,0,.012);
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
      background: rgba(255,75,0,.24);
      filter: blur(11px);
    }

    .hero-location-marker svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .hero-map-attribution {
      position: absolute;
      z-index: 4;
      right: 12px;
      bottom: 8px;
      padding: 3px 6px;
      border-radius: 5px;
      background: rgba(0,0,0,.54);
      color: rgba(255,255,255,.48);
      font-size: 7px;
      line-height: 1;
      letter-spacing: .02em;
      pointer-events: auto;
    }

    .hero-map-attribution a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 1060px) {
      .hero-map-shade {
        background:
          linear-gradient(
            180deg,
            rgba(0,0,0,.96) 0%,
            rgba(0,0,0,.90) 45%,
            rgba(0,0,0,.58) 70%,
            rgba(0,0,0,.28) 100%
          );
      }

      .hero-real-map .hero-visual {
        min-height: 320px;
      }

      .hero-location-marker {
        width: 78px;
        height: 100px;
      }
    }

    @media (max-width: 700px) {
      .hero-map-live,
      .hero-map-shade {
        top: 72px;
      }

      .hero-map-attribution {
        font-size: 6px;
      }

      .hero-location-marker::before {
        width: 128px;
        height: 128px;
        box-shadow: 0 0 0 30px rgba(255,75,0,.024);
      }
    }
  `;
  document.head.appendChild(mapStyles);

  hero.classList.add('hero-real-map');

  const mapLayer = document.createElement('div');
  mapLayer.className = 'hero-map-live';
  mapLayer.setAttribute('aria-hidden', 'true');
  mapLayer.innerHTML = '<div id="hero-real-map-canvas"></div>';

  const shade = document.createElement('div');
  shade.className = 'hero-map-shade';
  shade.setAttribute('aria-hidden', 'true');

  const glow = document.createElement('div');
  glow.className = 'hero-map-orange-glow';
  glow.setAttribute('aria-hidden', 'true');

  const attribution = document.createElement('div');
  attribution.className = 'hero-map-attribution';
  attribution.innerHTML = '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a> · <a href="https://carto.com/attributions" target="_blank" rel="noopener">© CARTO</a>';

  hero.prepend(mapLayer);
  hero.appendChild(shade);
  hero.appendChild(glow);
  hero.appendChild(attribution);

  heroVisual.setAttribute('aria-label', 'Mapa urbano real representando a presença local do negócio');
  heroVisual.innerHTML = `
    <div class="hero-location-marker" aria-hidden="true">
      <svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 6C31.8 6 9 28.8 9 57c0 38.8 51 84 51 84s51-45.2 51-84C111 28.8 88.2 6 60 6Z" fill="currentColor"/>
        <circle cx="60" cy="57" r="18" fill="#080808"/>
      </svg>
    </div>
  `;

  const loadLeaflet = () => {
    if (window.L) {
      initHeroMap();
      return;
    }

    if (!document.querySelector('link[data-leaflet-css]')) {
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      leafletCss.dataset.leafletCss = 'true';
      document.head.appendChild(leafletCss);
    }

    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletScript.defer = true;
    leafletScript.onload = initHeroMap;
    document.head.appendChild(leafletScript);
  };

  function initHeroMap() {
    const canvas = document.getElementById('hero-real-map-canvas');
    if (!canvas || !window.L || canvas.dataset.ready === 'true') return;
    canvas.dataset.ready = 'true';

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const realMap = L.map(canvas, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      zoomSnap: 0.25,
      fadeAnimation: true,
      markerZoomAnimation: false
    });

    /* Centro urbano real apenas como base visual; sem alegar endereço ou área atendida. */
    realMap.setView([-23.5505, -46.6333], 14.25);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 3,
      detectRetina: true
    }).addTo(realMap);

    window.addEventListener('resize', () => realMap.invalidateSize({ pan: false }), { passive: true });
  }

  loadLeaflet();
}
