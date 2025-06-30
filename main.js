import {
  getData,
  getCustomData,
  closeMenu,
  updateActiveSwitch,
  getDiscoveryData,
  removeCurrentSection,
  scrollToTop,
} from "./functions.js";

import {
  createMovie,
  createGenres,
  createCast,
  createSimillar,
  createKnownForMovie,
  moviePosterDefault,
} from "./components/movie.js";

import { createCastProfile } from "./components/cast.js";

import { renderDiscover } from "./components/discover.js";
import { discoverSwiperObj } from "./swiper.js";
renderDiscover();
discoverSwiperObj();

let mobileMenuBtn = document.querySelector(".mobile-menu-button");
let mobileMenu = document.querySelector(".side-bar");
let menuTriggered = false;
let navbar = document.querySelector("nav");
let allSwitches = document.querySelectorAll(".main-switch");
let discoverContainer = document.querySelector(".discover-container");
let trendingMovieDiv = document.querySelector(".trending-movie");
let trendingTvDiv = document.querySelector(".trending-tv");
let trendingParent = document.querySelector(".trending");

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

let movieSkeleton = document.querySelector(".movie-skeleton");
let failedLoading = document.querySelector(".failed-loading");

let imagePath = "https://image.tmdb.org/t/p/original";
export let defaultPhoto =
  "https://i.pinimg.com/736x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg";

const APIKEY = "9cca2fe3162fa3d7db2b1762e9779b1d";

let getPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`;
let topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`;
let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`;
let searchQuery = "";
let searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}`;
let selectedGenre = 0;
let genreMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${selectedGenre}`;
let upcomingMovie = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US`;
let trendingMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}`;
let trendingTv = `https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`;

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

document.addEventListener("click", async (e) => {
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

    // rerender the discover page
    if (selectedSwitch === "discover") {
      renderDiscover();
      discoverSwiperObj();
      await getDiscoveryData(
        getData,
        getPopular,
        imagePath,
        document.querySelector(".most-popular .swiper-wrapper"),
        upcomingMovie,
        document.querySelector(".upcoming .swiper-wrapper"),
        topRated,
        document.querySelector(".top-rated .swiper-wrapper"),
        nowPlaying,
        document.querySelector(".now-playing .swiper-wrapper"),
        trendingMovie,
        document.querySelector(".trending-movie"),
        trendingTv,
        document.querySelector(".trending-tv")
      );
    }
  }

  if (e.target.closest(".open-movie")) {
    removeCurrentSection();
    movieSkeleton.classList.remove("hidden");
    scrollToTop();

    try {
      let clickedMovie = e.target.closest(".open-movie");
      let clickedMovieDetails = await getCustomData(
        `https://api.themoviedb.org/3/movie`,
        clickedMovie.id,
        "",
        APIKEY
      );
      let clickedMovieCast = await getCustomData(
        `https://api.themoviedb.org/3/movie`,
        clickedMovie.id,
        "/credits",
        APIKEY
      );
      let clickedMovieSimillar = await getCustomData(
        `https://api.themoviedb.org/3/movie`,
        clickedMovie.id,
        "/similar",
        APIKEY
      );
      let clickedMovieRecommendations = await getCustomData(
        `https://api.themoviedb.org/3/movie`,
        clickedMovie.id,
        "/recommendations",
        APIKEY
      );

      movieSkeleton.classList.add("hidden");
      const {
        title,
        id: movieId,
        backdrop_path: movieBanner,
        poster_path: moviePoster,
        vote_average: movieRate,
        tagline: quote,
        overview: movieDesc,
        spoken_languages: movieLang,
        runtime: movieDuration,
        revenue,
        release_date: movieDate,
        genres,
      } = clickedMovieDetails;
      createMovie(
        movieBanner,
        moviePoster,
        imagePath,
        title,
        movieRate,
        movieDuration,
        revenue,
        movieDate,
        movieLang,
        quote,
        movieDesc
      );
      createGenres(genres, document.querySelector(".movie-genre"));
      createCast(
        clickedMovieCast,
        imagePath,
        document.querySelector(".cast .swiper-wrapper"),
        defaultPhoto
      );
      createSimillar(
        clickedMovieSimillar,
        imagePath,
        document.querySelector(".simillar .swiper-wrapper")
      );
      createSimillar(
        clickedMovieRecommendations,
        imagePath,
        document.querySelector(".recommendations .swiper-wrapper")
      );
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
    }
  }

  if (e.target.closest(".cast-open")) {
    let clickedCast = e.target.closest(".cast-open");
    let getCastProfile = await getCustomData(
      "https://api.themoviedb.org/3/person",
      clickedCast.id,
      "",
      APIKEY
    );
    let getCastKnownFor = await getCustomData(
      "https://api.themoviedb.org/3/person",
      clickedCast.id,
      "/movie_credits",
      APIKEY
    );

    const {
      known_for_department: knownFor,
      name,
      profile_path,
      gender,
      birthday,
      biography,
      place_of_birth,
    } = getCastProfile;

    scrollToTop();
    removeCurrentSection();
    createCastProfile(
      imagePath,
      profile_path,
      moviePosterDefault,
      knownFor,
      gender,
      birthday,
      place_of_birth,
      name,
      biography
    );
    createKnownForMovie(
      getCastKnownFor.cast,
      imagePath,
      document.querySelector(".known-for-posters"),
      moviePosterDefault
    );
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

// getData(movieDetails).then((result) => console.log(result));
// console.log(await getMovieCastById("1311844", APIKEY));

await getDiscoveryData(
  getData,
  getPopular,
  imagePath,
  mostPopularSwiperWrapper,
  upcomingMovie,
  upcomingSwiperWrapper,
  topRated,
  topRatedSwiperWrapper,
  nowPlaying,
  nowPlayingSwiperWrapper,
  trendingMovie,
  trendingMovieDiv,
  trendingTv,
  trendingTvDiv
);
