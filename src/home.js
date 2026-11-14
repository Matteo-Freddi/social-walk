import './main.css';

const nav = document.getElementById('tappe');
for (let i = 1; i <= 7; i++) {
  nav.insertAdjacentHTML(
    'beforeend',
    `<a href="${import.meta.env.BASE_URL}tappa-${i}/">Tappa ${i}</a>`
  );
}