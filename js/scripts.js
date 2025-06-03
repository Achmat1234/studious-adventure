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
    // Clamp so last page is always full cards (or less if not enough)
    currentIndex = Math.max(
      0,
      Math.min(currentIndex, Math.max(0, cards.length - visibleCards))
    );
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

  // --- Swipe support for carousel ---
  let startX = 0;
  let isTouching = false;

  carousel.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      isTouching = true;
    }
  });

  carousel.addEventListener('touchmove', function (e) {
    if (isTouching) e.preventDefault();
  }, { passive: false });

  carousel.addEventListener('touchend', function (e) {
    if (!isTouching) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (Math.abs(diffX) > 40) { // Minimum swipe distance
      if (diffX < 0) {
        rightBtn && rightBtn.click();
      } else {
        leftBtn && leftBtn.click();
      }
    }
    isTouching = false;
  });

  updateCarousel();
});

// ...existing carousel JS...

// --- Swipe support for carousel ---
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('product-carousel');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  if (!carousel) return;

  let startX = 0;
  let isTouching = false;

  carousel.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      isTouching = true;
    }
  });

  carousel.addEventListener('touchmove', function (e) {
    // Prevent scrolling the page while swiping carousel
    if (isTouching) e.preventDefault();
  }, { passive: false });

  carousel.addEventListener('touchend', function (e) {
    if (!isTouching) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (Math.abs(diffX) > 40) { // Minimum swipe distance
      if (diffX < 0) {
        // Swipe left: next
        rightBtn && rightBtn.click();
      } else {
        // Swipe right: prev
        leftBtn && leftBtn.click();
      }
    }
    isTouching = false;
  });
});