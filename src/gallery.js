import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination';

export function initGallery(el, images) {
  const wrap = el.querySelector('.swiper-wrapper');
  wrap.innerHTML = images.map(src =>
    `<div class="swiper-slide"><img src="${import.meta.env.BASE_URL}images/${src}" loading="lazy" alt=""></div>`
  ).join('');
  return new Swiper(el, {
    modules: [Navigation, Pagination, Keyboard],
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    keyboard: true,
  });
}