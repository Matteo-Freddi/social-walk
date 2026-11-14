import './main.css';

const lista = document.getElementById('partecipanti');
const inizia = document.getElementById('inizia');

function iniziali(nome) {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

async function caricaPartecipanti() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}partecipanti.json`);
    if (!res.ok) throw new Error(res.status);
    const nomi = await res.json();
    nomi.forEach((nome, i) => {
      const li = document.createElement('li');
      li.textContent = nome; // textContent: niente HTML iniettato dal file
      li.dataset.iniziali = iniziali(String(nome));
      li.style.setProperty('--i', i);
      lista.append(li);
    });
  } catch (e) {
    lista.innerHTML = '<li class="vuoto">Elenco partecipanti non disponibile</li>';
    console.error(e);
  } finally {
    inizia.hidden = false; // il tasto compare comunque
  }
}

caricaPartecipanti();