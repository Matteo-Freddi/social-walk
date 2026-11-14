import './home.css';

const lista = document.getElementById('partecipanti');
const inizia = document.getElementById('inizia');
const conta = document.getElementById('conta');
const camminatori = document.getElementById('camminatori');

const FILE = 'partecipanti.json';
const MAGLIE = ['#e30613', '#00a24f', '#ffd200', '#0a6fd6', '#a05fb0']; // come le linee M1–M5
const PELLI = ['#ffd7b5', '#f1b98a', '#c68642', '#8d5524', '#ffe0bd'];
const CAPELLI = ['#24135c', '#6b3e26', '#e0a030', '#1a1a1a', '#c0392b'];

/* ---------- lettura del file ---------- */

function estraiNomi(dati) {
  const grezzo = Array.isArray(dati) ? dati : dati?.partecipanti;
  if (!Array.isArray(grezzo)) throw new Error('formato non valido: atteso un array di nomi');
  return grezzo.map((n) => String(n ?? '').trim()).filter(Boolean);
}

async function leggiPartecipanti() {
  // più percorsi possibili: base di Vite, relativo alla pagina, radice del sito
  const candidati = [
    `${import.meta.env.BASE_URL}${FILE}`,
    new URL(FILE, document.baseURI).href,
    `/${FILE}`,
    `./${FILE}`,
  ].map((p) => new URL(p, document.baseURI).href);

  const errori = [];
  for (const url of new Set(candidati)) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const testo = (await res.text()).replace(/^\uFEFF/, ''); // via l'eventuale BOM
      return estraiNomi(JSON.parse(testo)); // se arriva index.html, qui salta e si passa al prossimo
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
    avatar.textContent = iniziali(nome);

    const dati = document.createElement('span');
    dati.className = 'dati';
    const n = document.createElement('span');
    n.className = 'nome';
    n.textContent = nome; // textContent: niente HTML iniettato dal file
    const etichetta = document.createElement('small');
    etichetta.textContent = `Camminatore ${i + 1}`;

    dati.append(n, etichetta);
    li.append(avatar, dati);
    lista.append(li);
  });
  conta.textContent = `${nomi.length} ${nomi.length === 1 ? 'camminatore' : 'camminatori'}`;
}

function mostraErrore() {
  const li = document.createElement('li');
  li.className = 'vuoto';
  li.textContent = 'Elenco partecipanti non disponibile';
  lista.replaceChildren(li);
}

/* ---------- omini che camminano sullo sfondo ---------- */

function camminatore(i) {
  const maglia = MAGLIE[i % MAGLIE.length];
  const pelle = PELLI[(i * 2 + 1) % PELLI.length];
  const capelli = CAPELLI[(i * 3 + 2) % CAPELLI.length];
  const gamba = (v) => `
    <g class="gamba ${v}">
      <rect x="17" y="47" width="8" height="26" rx="4" fill="#24135c"/>
      <rect x="17" y="69" width="14" height="7" rx="3.5" fill="#fff" stroke="#24135c" stroke-width="1.6"/>
    </g>`;
  const braccio = (v) => `<g class="braccio ${v}"><rect x="18" y="25" width="6" height="22" rx="3" fill="${pelle}"/></g>`;

  const el = document.createElement('div');
  el.className = 'camminatore';
  el.style.setProperty('--k', i);
  el.innerHTML = `
    <svg viewBox="0 0 44 80">
      <rect x="3" y="26" width="11" height="19" rx="4.5" fill="#24135c"/>
      ${braccio('b')}
      ${gamba('b')}
      <rect x="11" y="21" width="20" height="30" rx="9" fill="${maglia}" stroke="#24135c" stroke-width="2"/>
      ${gamba('a')}
      <circle cx="22" cy="12" r="8.5" fill="${pelle}" stroke="#24135c" stroke-width="2"/>
      <path d="M13.5 11a8.5 8.5 0 0 1 17 0z" fill="${capelli}"/>
      ${braccio('a')}
    </svg>`;
  return el;
}

function disegnaCamminatori(quanti) {
  const n = Math.max(1, Math.min(quanti || 4, 8));
  camminatori.style.setProperty('--n', n);
  camminatori.replaceChildren(...Array.from({ length: n }, (_, i) => camminatore(i)));
}

/* ---------- avvio ---------- */

async function avvia() {
  mostraScheletri();
  let quanti = 4;
  try {
    const nomi = await leggiPartecipanti();
    quanti = nomi.length;
    if (nomi.length) disegnaPartecipanti(nomi);
    else mostraErrore();
  } catch (e) {
    mostraErrore();
    console.error(e);
  } finally {
    lista.removeAttribute('aria-busy');
    disegnaCamminatori(quanti);
    inizia.hidden = false; // il tasto compare comunque
  }
}

avvia();