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


/* Profession explorer — conteúdo contextual por nicho */
const professionTabs = Array.from(document.querySelectorAll('.profession-tab'));
const professionShowcase = document.querySelector('#profession-showcase');

if (professionTabs.length && professionShowcase) {
  const professionContent = {
    eletricistas: {
      label: 'ELETRICISTAS',
      status: 'MODELOS DISPONÍVEIS',
      title: 'Quem precisa de um eletricista quer entender rápido se você faz o serviço e atende a região dele.',
      copy: 'Seu site pode apresentar com clareza os serviços elétricos que você realmente presta, as cidades onde atende, trabalhos realizados e um caminho direto para o cliente falar com você pelo WhatsApp.',
      keywords: ['Instalação elétrica', 'Manutenção', 'Quadro e disjuntores', 'Área de atendimento'],
      benefits: [
        'Quais serviços elétricos você oferece',
        'Onde você atende',
        'Exemplos do seu trabalho',
        'Como pedir atendimento'
      ],
      note: 'Para eletricistas, a Destaque Local já possui modelos profissionais prontos para você conhecer antes de decidir.',
      cta: 'VER MODELOS PARA ELETRICISTAS',
      href: '#modelos',
      icon: '<svg viewBox="0 0 24 24"><path d="M13 2 6.5 12H12l-1 10 6.5-11H12l1-9Z"/></svg>'
    },
    encanadores: {
      label: 'ENCANADORES',
      title: 'Quando aparece um vazamento ou problema hidráulico, o cliente quer saber se você resolve e atende perto dele.',
      copy: 'Um site de encanador pode organizar os serviços hidráulicos que você realmente oferece, mostrar sua região de atendimento e facilitar o contato de quem procura ajuda para reparos, instalações ou manutenção.',
      keywords: ['Vazamentos', 'Tubulação', 'Torneiras e registros', 'Atendimento local'],
      benefits: [
        'Quais problemas hidráulicos você atende',
        'Bairros, cidades e regiões atendidas',
        'Serviços e trabalhos já realizados',
        'Contato rápido para pedir orçamento'
      ],
      note: 'A Destaque Local organiza essas informações em uma página clara para o cliente entender seu serviço antes de chamar.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE ENCANADOR',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M5 4v5a4 4 0 0 0 4 4h2v7"/><path d="M3 4h4M9 20h4M11 13h4a4 4 0 0 0 4-4V6"/><path d="M17 4h4v4h-4z"/></svg>'
    },
    pintores: {
      label: 'PINTORES',
      title: 'Antes de contratar um pintor, o cliente quer enxergar acabamento, tipo de pintura e qualidade do trabalho.',
      copy: 'Seu site pode mostrar pinturas internas e externas, acabamentos, preparação de superfícies, fotos de trabalhos e as cidades onde você atende — sempre usando apenas os serviços que você realmente presta.',
      keywords: ['Pintura interna', 'Pintura externa', 'Acabamento', 'Trabalhos realizados'],
      benefits: [
        'Tipos de pintura que você executa',
        'Fotos de antes e depois',
        'Região em que você trabalha',
        'Como solicitar uma avaliação'
      ],
      note: 'A Destaque Local ajuda a transformar seu portfólio e suas informações em uma apresentação profissional fácil de compartilhar.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE PINTURA',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 5h10v5H4z"/><path d="M14 7h3a2 2 0 0 1 2 2v2"/><path d="M19 11h-6v3h3v6h-4v-6"/><path d="M5 7h8"/></svg>'
    },
    pedreiros: {
      label: 'PEDREIROS',
      title: 'Obra e reforma dependem de confiança. Seu site precisa deixar claro o que você executa e onde trabalha.',
      copy: 'Um site pode apresentar seus serviços de obra, reforma, alvenaria, revestimentos e reparos de forma organizada, além de reunir fotos de trabalhos e sua área de atendimento.',
      keywords: ['Reformas', 'Alvenaria', 'Pisos e revestimentos', 'Obras locais'],
      benefits: [
        'Tipos de obra e reforma que você faz',
        'Serviços que entram no seu escopo',
        'Trabalhos já concluídos',
        'Cidades e bairros atendidos'
      ],
      note: 'A Destaque Local ajuda o cliente a entender seu trabalho antes mesmo da primeira conversa.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE PEDREIRO',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 8h16v4H4zM6 4h5v4H6zM13 4h5v4h-5zM6 12h5v4H6zM13 12h5v4h-5zM8 16h8v4H8z"/></svg>'
    },
    marceneiros: {
      label: 'MARCENEIROS',
      title: 'Móveis sob medida são vendidos pelos detalhes. Seu site precisa mostrar projeto, acabamento e resultado.',
      copy: 'Para marcenaria, a apresentação visual pesa muito. Seu site pode destacar móveis sob medida, armários, painéis, ambientes e projetos concluídos, além de mostrar onde você atende.',
      keywords: ['Móveis sob medida', 'Armários', 'Painéis', 'Projetos realizados'],
      benefits: [
        'Tipos de móveis que você produz',
        'Fotos de projetos e acabamentos',
        'Região onde realiza medições e entregas',
        'Contato para orçamento'
      ],
      note: 'A Destaque Local organiza seu portfólio para valorizar o trabalho sem transformar o site em um catálogo confuso.',
      cta: 'QUERO UM SITE PARA MEU TRABALHO DE MARCENARIA',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 18 18 4"/><path d="m14 4 6 6"/><path d="M7 15 4 12"/><path d="M3 21h8"/><path d="M15 13h6v8h-6z"/></svg>'
    },
    serralheiros: {
      label: 'SERRALHEIROS',
      title: 'Portões, grades e estruturas metálicas precisam mostrar capacidade técnica e acabamento antes do orçamento.',
      copy: 'Seu site pode apresentar os serviços de serralheria que você realmente executa, como portões, grades, estruturas, solda e peças sob medida, junto com fotos e área de atendimento.',
      keywords: ['Portões', 'Grades', 'Estruturas metálicas', 'Solda'],
      benefits: [
        'Quais peças e estruturas você fabrica',
        'Serviços de instalação ou reparo',
        'Fotos de trabalhos em metal',
        'Região atendida'
      ],
      note: 'A Destaque Local ajuda a apresentar sua serralheria de forma clara para quem está comparando profissionais.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE SERRALHERIA',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M5 5h14v4H5zM7 9v10M17 9v10M5 19h14"/><path d="M10 12h4v4h-4z"/></svg>'
    },
    vidraceiros: {
      label: 'VIDRACEIROS',
      title: 'Box, espelhos e vidros sob medida exigem confiança. O cliente quer ver exemplos antes de pedir orçamento.',
      copy: 'Um site de vidraceiro pode destacar box, espelhos, janelas, portas e outros serviços em vidro que você realmente oferece, além de reunir fotos e informar a região atendida.',
      keywords: ['Box', 'Espelhos', 'Janelas', 'Vidros sob medida'],
      benefits: [
        'Tipos de vidro e serviço que você trabalha',
        'Fotos de instalações concluídas',
        'Cidades e bairros atendidos',
        'Forma rápida de pedir orçamento'
      ],
      note: 'A Destaque Local coloca seus principais serviços e trabalhos em uma apresentação objetiva e profissional.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE VIDRAÇARIA',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M12 4v16M4 12h16"/><path d="m8 8 8 8"/></svg>'
    },
    montadores: {
      label: 'MONTADORES DE MÓVEIS',
      title: 'Quem comprou um móvel quer saber se você monta aquele tipo de peça, atende a região e trabalha com cuidado.',
      copy: 'Seu site pode apresentar montagem e desmontagem, tipos de móveis atendidos, fotos de serviços concluídos e as cidades onde você trabalha, facilitando o contato de quem precisa contratar um montador.',
      keywords: ['Montagem', 'Desmontagem', 'Guarda-roupas', 'Móveis modulados'],
      benefits: [
        'Quais móveis você costuma montar',
        'Se realiza desmontagem e remontagem',
        'Região de atendimento',
        'Fotos e contato para orçamento'
      ],
      note: 'A Destaque Local ajuda a transformar um serviço muito indicado por WhatsApp em uma presença profissional própria.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE MONTAGEM',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="M8 6v12M16 6v12"/><path d="M4 11h16"/><path d="M6 18v2M18 18v2"/></svg>'
    },
    'ar-condicionado': {
      label: 'TÉCNICOS DE AR-CONDICIONADO',
      title: 'Quando o ar-condicionado para ou precisa de limpeza, o cliente quer saber rápido quais serviços você faz.',
      copy: 'Seu site pode destacar instalação, higienização, manutenção e outros serviços de climatização que você realmente presta, além de informar marcas ou tipos de equipamento atendidos quando isso fizer parte do seu trabalho.',
      keywords: ['Instalação', 'Higienização', 'Manutenção', 'Climatização'],
      benefits: [
        'Quais serviços de ar-condicionado você faz',
        'Tipos de equipamento atendidos',
        'Região de atendimento',
        'Contato para solicitar serviço'
      ],
      note: 'A Destaque Local ajuda o cliente a identificar rapidamente se o seu serviço corresponde ao problema dele.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE AR-CONDICIONADO',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/></svg>'
    },
    jardineiros: {
      label: 'JARDINEIROS E PAISAGISTAS',
      title: 'Jardinagem entra pelos olhos. Seu site precisa mostrar cuidado, resultado e o tipo de área que você atende.',
      copy: 'Um site pode reunir poda, manutenção de jardins, gramados, paisagismo e outros serviços que você realmente oferece, usando imagens do seu trabalho para ajudar o cliente a visualizar o resultado.',
      keywords: ['Poda', 'Manutenção de jardins', 'Gramados', 'Paisagismo'],
      benefits: [
        'Quais serviços de jardinagem você oferece',
        'Fotos de jardins e áreas cuidadas',
        'Região onde você atende',
        'Contato para visita ou orçamento'
      ],
      note: 'A Destaque Local ajuda a colocar o resultado visual do seu trabalho no centro da apresentação.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO DE JARDINAGEM',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M12 21c0-7 3-12 8-15-1 7-4 11-8 12"/><path d="M12 21c0-6-3-10-8-13 0 6 3 10 8 11"/></svg>'
    },
    eletrodomesticos: {
      label: 'TÉCNICOS DE ELETRODOMÉSTICOS',
      title: 'Quem está com um eletrodoméstico parado quer descobrir rápido se você atende aquele aparelho e aquela região.',
      copy: 'Seu site pode informar quais tipos de eletrodomésticos você realmente conserta, serviços de diagnóstico e reparo, marcas atendidas quando aplicável e como o cliente solicita atendimento.',
      keywords: ['Geladeiras', 'Máquinas de lavar', 'Micro-ondas', 'Assistência técnica'],
      benefits: [
        'Quais aparelhos você atende',
        'Tipos de reparo que realiza',
        'Região de atendimento',
        'Como solicitar diagnóstico ou orçamento'
      ],
      note: 'A Destaque Local organiza as informações que normalmente o cliente perguntaria uma por uma no WhatsApp.',
      cta: 'QUERO UM SITE PARA MEU SERVIÇO TÉCNICO',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 7h2M14 7h2"/></svg>'
    },
    outros: {
      label: 'OUTROS SERVIÇOS LOCAIS',
      title: 'Seu serviço pode ser diferente, mas o cliente ainda precisa entender o que você faz, onde atende e como falar com você.',
      copy: 'Se você presta um serviço local que não aparece na lista, a Destaque Local pode avaliar seu caso e organizar as informações essenciais do seu negócio em uma apresentação profissional.',
      keywords: ['Serviços oferecidos', 'Região atendida', 'Trabalhos realizados', 'WhatsApp'],
      benefits: [
        'O que você faz',
        'Quem você atende',
        'Onde você trabalha',
        'Como o cliente entra em contato'
      ],
      note: 'Não tratamos a lista como limite. Se o seu serviço fizer sentido para o formato, podemos conversar antes de qualquer decisão.',
      cta: 'QUERO SABER SE FAZ SENTIDO PARA MEU NEGÓCIO',
      href: '#contato',
      icon: '<svg viewBox="0 0 24 24"><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/><path d="M3 21h18"/></svg>'
    }
  };

  const iconEl = professionShowcase.querySelector('[data-profession-icon]');
  const labelEl = professionShowcase.querySelector('[data-profession-label]');
  const statusEl = professionShowcase.querySelector('[data-profession-status]');
  const titleEl = professionShowcase.querySelector('[data-profession-title]');
  const copyEl = professionShowcase.querySelector('[data-profession-copy]');
  const keywordsEl = professionShowcase.querySelector('[data-profession-keywords]');
  const benefitsEl = professionShowcase.querySelector('[data-profession-benefits]');
  const noteEl = professionShowcase.querySelector('[data-profession-note]');
  const ctaEl = professionShowcase.querySelector('[data-profession-cta]');

  const renderProfession = (key) => {
    const data = professionContent[key];
    if (!data) return;

    professionShowcase.classList.add('is-updating');

    window.setTimeout(() => {
      iconEl.innerHTML = data.icon;
      labelEl.textContent = data.label;
      titleEl.textContent = data.title;
      copyEl.textContent = data.copy;
      keywordsEl.innerHTML = data.keywords.map((item) => '<span>' + item + '</span>').join('');
      benefitsEl.innerHTML = data.benefits.map((item) => '<li>' + item + '</li>').join('');
      noteEl.textContent = data.note;
      ctaEl.href = data.href;
      ctaEl.innerHTML = data.cta + ' <span aria-hidden="true">→</span>';

      if (data.status) {
        statusEl.textContent = data.status;
        statusEl.hidden = false;
      } else {
        statusEl.textContent = '';
        statusEl.hidden = true;
      }

      professionShowcase.classList.remove('is-updating');
    }, 110);
  };

  professionTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      professionTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });

      renderProfession(tab.dataset.profession);
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + professionTabs.length) % professionTabs.length;
      professionTabs[nextIndex].focus();
      professionTabs[nextIndex].click();
    });
  });
}
