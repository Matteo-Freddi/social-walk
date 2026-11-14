import './main.css';

const lista = document.getElementById('partecipanti');
const inizia = document.getElementById('inizia');

async function caricaPartecipanti() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}partecipanti.json`);
    if (!res.ok) throw new Error(res.status);
    const nomi = await res.json();
    for (const nome of nomi) {
      const li = document.createElement('li');
      li.textContent = nome; // textContent: niente HTML iniettato dal file
      lista.append(li);
    }
  } catch (e) {
    lista.innerHTML = '<li>Elenco partecipanti non disponibile</li>';
    console.error(e);
  } finally {
    inizia.hidden = false; // il tasto compare comunque
  }
}

caricaPartecipanti();