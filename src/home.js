import './home.css';

const lista = document.getElementById('partecipanti');
const conta = document.getElementById('conta');
const numGruppo = document.getElementById('num-gruppo');
const testata = document.getElementById('testata');
const hero = document.getElementById('hero');
const heroImg = document.getElementById('hero-img');
const tappaCard = document.getElementById('tappa-card');
const tappaImg = document.getElementById('tappa-img');

const FILE = 'partecipanti.json';
const BASE = import.meta.env.BASE_URL;

// Foto: mettile in public/images/ (o cambia i nomi qui).
// Se un file manca, resta il gradiente di riserva.
const IMMAGINI = {
  hero: 'images/hero.jpg',
  sforzesco: 'images/sforzesco.jpg',
};

const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- immagini con fallback ---------- */

function caricaFoto(file, elementoImg, contenitore) {
  const url = `${BASE}${file}`;
  const img = new Image();
  img.onload = () => {
    elementoImg.style.setProperty('--img', `url("${url}")`);
    contenitore.classList.add('con-foto');
  };
  img.onerror = () => {}; // nessuna foto: si tiene il gradiente
  img.src = url;
}

caricaFoto(IMMAGINI.hero, heroImg, hero);
caricaFoto(IMMAGINI.sforzesco, tappaImg, tappaCard);

/* ---------- lettura del file ---------- */

function estraiNomi(dati) {
  const grezzo = Array.isArray(dati) ? dati : dati?.partecipanti;
  if (!Array.isArray(grezzo)) throw new Error('formato non valido: atteso un array di nomi');
  return grezzo.map((n) => String(n ?? '').trim()).filter(Boolean);
}

async function leggiPartecipanti() {
  const candidati = [
    `${BASE}${FILE}`,
    new URL(FILE, document.baseURI).href,
    `/${FILE}`,
    `./${FILE}`,
  ].map((p) => new URL(p, document.baseURI).href);

  const errori = [];
  for (const url of new Set(candidati)) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const testo = (await res.text()).replace(/^\uFEFF/, '');
      return estraiNomi(JSON.parse(testo));
    } catch (e) {
      errori.push(`${url} → ${e.message}`);
    }
  }
  throw new Error(`${FILE} non raggiungibile:\n${errori.join('\n')}`);
}

/* ---------- partecipanti ---------- */

function iniziali(nome) {
  return nome.split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

function mostraScheletri() {
  lista.setAttribute('aria-busy', 'true');
  lista.replaceChildren(
    ...Array.from({ length: 4 }, () => Object.assign(document.createElement('li'), { className: 'scheletro' })),
  );
}

function disegnaPartecipanti(nomi) {
  lista.replaceChildren();
  nomi.forEach((nome, i) => {
    const li = document.createElement('li');
    li.style.setProperty('--i', i);

    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = iniziali(nome);

    const dati = document.createElement('span');
    dati.className = 'dati';
    const n = document.createElement('span');
    n.className = 'nome';
    n.textContent = nome; // textContent: nessun HTML iniettato dal file
    const etichetta = document.createElement('small');
    etichetta.textContent = `Camminatore ${i + 1}`;

    dati.append(n, etichetta);
    li.append(avatar, dati);
    lista.append(li);
  });
  conta.textContent = `${nomi.length} ${nomi.length === 1 ? 'camminatore' : 'camminatori'}`;
  contaFinoA(numGruppo, nomi.length);
}

function mostraErrore() {
  const li = document.createElement('li');
  li.className = 'vuoto';
  li.textContent = 'Elenco partecipanti non disponibile';
  lista.replaceChildren(li);
  numGruppo.textContent = '–';
}

function contaFinoA(el, fine) {
  if (ridotto || fine < 2) { el.textContent = fine; return; }
  const durata = 900;
  const t0 = performance.now();
  const passo = (t) => {
    const p = Math.min((t - t0) / durata, 1);
    el.textContent = Math.round(fine * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/* ---------- comparsa allo scroll ---------- */

const osservatore = new IntersectionObserver(
  (voci) => voci.forEach((v) => {
    if (v.isIntersecting) { v.target.classList.add('visibile'); osservatore.unobserve(v.target); }
  }),
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => osservatore.observe(el));

/* ---------- testata e parallasse ---------- */

let inAttesa = false;
function alloScroll() {
  if (inAttesa) return;
  inAttesa = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    testata.classList.toggle('solida', y > 40);
    if (!ridotto && y < window.innerHeight * 1.2) hero.style.setProperty('--py', y.toFixed(0));
    inAttesa = false;
  });
}
addEventListener('scroll', alloScroll, { passive: true });
alloScroll();

/* ---------- avvio ---------- */

async function avvia() {
  mostraScheletri();
  try {
    const nomi = await leggiPartecipanti();
    if (nomi.length) disegnaPartecipanti(nomi);
    else mostraErrore();
  } catch (e) {
    mostraErrore();
    console.error(e);
  } finally {
    lista.removeAttribute('aria-busy');
  }
}

avvia();