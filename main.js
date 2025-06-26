import {
  getData,
  getCustomData,
  closeMenu,
  updateActiveSwitch,
  createMoviesDiscovery,
  renderData,
} from "./functions.js";

let mobileMenuBtn = document.querySelector(".mobile-menu-button");
let mobileMenu = document.querySelector(".side-bar");
let menuTriggered = false;
let navbar = document.querySelector("nav");
let allSwitches = document.querySelectorAll(".main-switch");
let discoverContainer = document.querySelector(".discover-container");

let mostPopularSwiperWrapper = document.querySelector(
  ".most-popular .swiper-wrapper"
);
let topRatedSwiperWrapper = document.querySelector(
  ".top-rated .swiper-wrapper"
);
let nowPlayingSwiperWrapper = document.querySelector(
  ".now-playing .swiper-wrapper"
);
let upcomingSwiperWrapper = document.querySelector(".upcoming .swiper-wrapper");

let imagePath = "https://image.tmdb.org/t/p/original";

mobileMenuBtn.addEventListener("click", () => {
  // open menu
  if (!menuTriggered) {
    mobileMenu.classList.replace(
      "max-md:-translate-x-full",
      "max-md:translate-x-0"
    );
    discoverContainer.classList.replace("translate-x-0", "translate-x-[280px]");
    navbar.classList.replace("translate-x-0", "translate-x-[280px]");
    menuTriggered = true;
  } else {
    closeMenu(mobileMenu, navbar, discoverContainer);
    menuTriggered = false;
  }
});

document.addEventListener("click", (e) => {
  // close menu
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMenu(mobileMenu, navbar, discoverContainer);
    menuTriggered = false;
  }

  // close menu when clicking on anything
  if (window.innerWidth < 400) {
    if (mobileMenu.contains(e.target)) {
      closeMenu(mobileMenu, navbar, discoverContainer);
      menuTriggered = false;
    }
  }

  // update selected link
  if (e.target.classList.contains("main-switch")) {
    let selectedDiv = e.target;
    let selectedSwitch = ["discover", "movies", "tv", "people", "about"].find(
      (type) => selectedDiv.classList.contains(type)
    );
    updateActiveSwitch(allSwitches, selectedSwitch);
  }
});

// return menu and navbar to their places if triggered and the screen width bigger than 768px
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  if (width > 768 && menuTriggered) {
    closeMenu(mobileMenu, navbar, discoverContainer);
    menuTriggered = false;
  }
});

const APIKEY = "9cca2fe3162fa3d7db2b1762e9779b1d";

let getPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`;
let topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`;
let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`;
let searchQuery = "";
let searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}`;
let selectedGenre = 0;
let discoverMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${selectedGenre}`;
let upcomingMovie = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US`;

// getData(getPopular).then((data) => {
//   data.results.forEach((movie) => {
//     createMoviesDiscovery(movie, imagePath, mostPopularSwiperWrapper);
//   });
// });

await renderData(getData, getPopular, imagePath, mostPopularSwiperWrapper);
await renderData(getData, upcomingMovie, imagePath, upcomingSwiperWrapper);
await renderData(getData, topRated, imagePath, topRatedSwiperWrapper);
await renderData(getData, nowPlaying, imagePath, nowPlayingSwiperWrapper);
