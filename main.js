import { getData, getCustomData, closeMenu } from "./functions.js";

let mobileMenuBtn = document.querySelector(".mobile-menu-button");
let mobileMenu = document.querySelector(".side-bar");
let menuTriggered = false;
let navbar = document.querySelector("nav");

mobileMenuBtn.addEventListener("click", () => {
  // open menu
  if (!menuTriggered) {
    mobileMenu.classList.replace(
      "max-md:-translate-x-full",
      "max-md:translate-x-0"
    );
    navbar.classList.replace("translate-x-0", "translate-x-[280px]");
    menuTriggered = true;
  }
});

document.addEventListener("click", (e) => {
  // close menu
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMenu(mobileMenu, navbar);
    menuTriggered = false;
  }
});

// return menu and navbar to their places if triggered and there's a screen width resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  if (width > 768 && menuTriggered) {
    closeMenu(mobileMenu, navbar);
    menuTriggered = false;
  }
});

// const APIKEY = "9cca2fe3162fa3d7db2b1762e9779b1d";

// let getPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`;
// let searchQuery = "";
// let searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}`;
// let selectedGenre = 0;
// let discoverMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${selectedGenre}`;
// let upcomingMovie = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US`;

// getData(getPopular).then((data) => {
//   data.results.forEach((movie) => {
//     console.log(movie);
//   });
// });
