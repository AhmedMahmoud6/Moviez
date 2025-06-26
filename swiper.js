const swiper = new Swiper(".swiper", {
  // loop: true,
  slidesPerView: 4,
  slidesPerGroup: 4,
  rewind: true,
  watchOverflow: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1280: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    450: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
});
