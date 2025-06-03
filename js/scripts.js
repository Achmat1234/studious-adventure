/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('product-carousel');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  if (!carousel) return;

  const cardSelector = '.product-card';
  let cards = carousel.querySelectorAll(cardSelector);

  const cardWidth = 120 + 8; // 120px card + 8px gap

  function getVisibleCards() {
    return Math.floor(carousel.parentElement.offsetWidth / cardWidth) || 1;
  }

  let currentIndex = 0;

  function updateCarousel() {
    cards = carousel.querySelectorAll(cardSelector);
    const visibleCards = getVisibleCards();
    currentIndex = Math.max(0, Math.min(currentIndex, cards.length - visibleCards));
    const offset = currentIndex * cardWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
    leftBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    rightBtn.style.visibility = (currentIndex + visibleCards) >= cards.length ? 'hidden' : 'visible';
  }

  leftBtn.addEventListener('click', () => {
    currentIndex -= getVisibleCards();
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    currentIndex += getVisibleCards();
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
});