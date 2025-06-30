export function discoverSwiperObj() {
  document.querySelectorAll(".swiper").forEach((el) => {
    new Swiper(el, {
      slidesPerView: 4,
      slidesPerGroup: 4,
      rewind: true,
      watchOverflow: true,
      spaceBetween: 30,
      pagination: {
        el: el.querySelector(".swiper-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector(".swiper-button-next"),
        prevEl: el.querySelector(".swiper-button-prev"),
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
  });
}

export function createSecondCastObj() {
  const secondSwiper = new Swiper(".second-swiper", {
    // loop: true,
    slidesPerView: 4,
    slidesPerGroup: 4,
    rewind: true,
    watchOverflow: true,
    spaceBetween: 20,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      1536: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1000: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },

      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
  });
}

export function createThirdSeasonsObj() {
  const secondSwiper = new Swiper(".seasons .second-swiper", {
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    rewind: true,
    watchOverflow: true,
    spaceBetween: 20,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
