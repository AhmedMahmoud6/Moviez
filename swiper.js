export function discoverSwiperObj() {
  document.querySelectorAll(".swiper").forEach((el) => {
    new Swiper(el, {
      slidesPerView: 4,
      slidesPerGroup: 4,
      speed: 800,
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
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true, // pause when hovered
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
    speed: 800,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: true, // pause when hovered
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
  const secondSwiper = new Swiper(".seasons .third-swiper", {
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    rewind: true,
    watchOverflow: true,
    spaceBetween: 20,
    speed: 600,

    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true, // pause when hovered
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

export function createFourthSeasonsObj() {
  const secondSwiper = new Swiper(".showcase .fourth-swiper", {
    // loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    rewind: true,
    watchOverflow: true,
    spaceBetween: 20,
    speed: 1300,
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: true, // pause when hovered
    },

    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
