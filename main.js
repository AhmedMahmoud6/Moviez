import {
  getData,
  getCustomData,
  closeMenu,
  updateActiveSwitch,
  getDiscoveryData,
  removeCurrentSection,
  scrollToTop,
  createKnownForTV,
  updateMovieSectionMovies,
  updatePaginationDisabled,
} from "./functions.js";

import {
  createMovie,
  createGenres,
  createCast,
  createSimillar,
  createKnownForMovie,
  moviePosterDefault,
} from "./components/movie.js";

import { createSeasons, createTV } from "./components/tv.js";

import { createCastProfile } from "./components/cast.js";

import { renderDiscover } from "./components/discover.js";
import { createThirdSeasonsObj, discoverSwiperObj } from "./swiper.js";
import { createSeasonDetails } from "./components/season.js";
import {
  createAllMoviesForMoviesSection,
  createMoviesSection,
} from "./components/moviesSection.js";
import { createSearchResult } from "./components/searchResult.js";

let lastPage = 1;
let currentPage = 1;
let isMovie = true;

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
let refreshButton = document.querySelector(".refresh");

let searchInput = document.querySelector(".search-container input");
let searchResultParent = document.querySelector(".search-result-container");

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
    document
      .querySelector("section:not(.movie-skeleton)")
      .classList.replace("translate-x-0", "translate-x-[280px]");
    navbar.classList.add("transform", "translate-x-0");
    navbar.classList.replace("translate-x-0", "translate-x-[280px]");
    menuTriggered = true;
  } else {
    closeMenu(
      mobileMenu,
      navbar,
      document.querySelector("section:not(.movie-skeleton)")
    );
    navbar.classList.remove("transform", "translate-x-0");

    menuTriggered = false;
  }
});

refreshButton.addEventListener("click", () => {
  window.location.reload();
});

searchInput.addEventListener("input", async () => {
  let userInput = searchInput.value.trim();
  if (userInput) {
    searchResultParent.classList.remove("hidden");

    let searchReslutData = await getData(
      `https://api.themoviedb.org/3/search/multi?query=${userInput}&api_key=${APIKEY}`
    );
    searchResultParent.innerHTML = "";
    createSearchResult(searchReslutData.results, imagePath, searchResultParent);
  } else {
    searchResultParent.classList.add("hidden");
  }
});

searchInput.addEventListener("click", () => {
  let userInput = searchInput.value.trim();
  if (userInput) searchResultParent.classList.remove("hidden");
});

document.addEventListener("click", async (e) => {
  // close menu
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMenu(
      mobileMenu,
      navbar,
      document.querySelector("section:not(.movie-skeleton)")
    );
    navbar.classList.remove("transform", "translate-x-0");
    menuTriggered = false;
  }

  // close menu when clicking on anything
  if (window.innerWidth < 400) {
    if (mobileMenu.contains(e.target)) {
      closeMenu(
        mobileMenu,
        navbar,
        document.querySelector("section:not(.movie-skeleton)")
      );
      navbar.classList.remove("transform", "translate-x-0");
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
      scrollToTop();
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
    } else if (selectedSwitch === "movies" || selectedSwitch === "tv") {
      if (selectedSwitch === "movies") isMovie = true;
      else isMovie = false;

      removeCurrentSection();

      let currentYear = new Date();
      let getMoviesSectionShowcaseData = await getData(
        isMovie
          ? nowPlaying
          : `https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}&language=en-US&page=1`
      );

      createMoviesSection(getMoviesSectionShowcaseData, imagePath, isMovie);
      currentPage = 1;

      let getMoviesSectionFilteredData = await getData(
        `https://api.themoviedb.org/3/discover/${
          isMovie ? "movie" : "tv"
        }?api_key=${APIKEY}&${
          isMovie ? "primary_release_year" : "first_air_date_year"
        }=${currentYear.getFullYear()}&sort_by=popularity.desc&vote_average.gte=6&with_original_language=en&with_genres=${
          isMovie ? "28" : "10759"
        }&page=1`
      );

      lastPage = getMoviesSectionFilteredData.total_pages;

      getMoviesSectionFilteredData.results.forEach((movie) => {
        const { title, name, id, poster_path, vote_average } = movie;
        createAllMoviesForMoviesSection(
          id,
          imagePath,
          poster_path,
          isMovie ? title : name,
          vote_average,
          isMovie
        );
      });
      updatePaginationDisabled(currentPage, lastPage);
      document
        .querySelector(".filters")
        .addEventListener("change", async () => {
          document
            .querySelectorAll(".pagination")
            .forEach((pagination) => pagination.classList.remove("hidden"));
          currentPage = 1;
          let pageText = document.querySelectorAll(".page-number");

          for (let i of pageText) i.textContent = currentPage;
          let updatedMovies = await updateMovieSectionMovies(
            APIKEY,
            imagePath,
            currentPage,
            isMovie
          );
          lastPage = updatedMovies.totalPages;
          updatePaginationDisabled(currentPage, lastPage);

          if (updatedMovies.data.total_results === 0) {
            document
              .querySelectorAll(".pagination")
              .forEach((pagination) => pagination.classList.add("hidden"));
            document.querySelector(".all-displayed-movies").innerHTML =
              "<h1 class='absolute w-full text-red-400 text-xl text-center font-bold'>No results found</h1>";
          }
        });
    }
  }
  if (e.target.closest(".pagination") && e.target.localName === "button") {
    let pageText = document.querySelectorAll(".page-number");

    let selectedBtn = e.target;

    if (selectedBtn.classList.item(0) === "first-page") currentPage = 1;
    else if (selectedBtn.classList.item(0) === "prev-page") currentPage -= 1;
    else if (selectedBtn.classList.item(0) === "last-page")
      currentPage = lastPage;
    else if (selectedBtn.classList.item(0) === "next-page") currentPage += 1;

    for (let i of pageText) i.textContent = currentPage;
    updatePaginationDisabled(currentPage, lastPage);
    await updateMovieSectionMovies(APIKEY, imagePath, currentPage, isMovie);
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
      } = clickedMovieDetails.myData;
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
        clickedMovieCast.myData,
        imagePath,
        document.querySelector(".cast .swiper-wrapper"),
        defaultPhoto
      );
      createSimillar(
        clickedMovieSimillar.myData,
        imagePath,
        document.querySelector(".simillar .swiper-wrapper")
      );
      createSimillar(
        clickedMovieRecommendations.myData,
        imagePath,
        document.querySelector(".recommendations .swiper-wrapper")
      );
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
    }
  }

  if (e.target.closest(".open-tv")) {
    removeCurrentSection();
    movieSkeleton.classList.remove("hidden");
    scrollToTop();

    try {
      let clickedMovie = e.target.closest(".open-tv");
      let clickedMovieDetails = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "",
        APIKEY
      );

      let clickedMovieCast = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/credits",
        APIKEY
      );
      let clickedMovieSimillar = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/similar",
        APIKEY
      );
      let clickedMovieRecommendations = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/recommendations",
        APIKEY
      );

      movieSkeleton.classList.add("hidden");
      const {
        name,
        backdrop_path: movieBanner,
        poster_path: moviePoster,
        vote_average: movieRate,
        tagline: quote,
        overview: movieDesc,
        spoken_languages: movieLang,
        episode_run_time: movieDuration,
        first_air_date: movieDate,
        genres,
        number_of_seasons,
      } = clickedMovieDetails.myData;
      createTV(
        movieBanner,
        moviePoster,
        imagePath,
        name,
        movieRate,
        movieDuration[0],
        movieDate,
        movieLang,
        quote,
        movieDesc
      );
      createGenres(genres, document.querySelector(".tv-genre"));
      createCast(
        clickedMovieCast.myData,
        imagePath,
        document.querySelector(".cast .swiper-wrapper"),
        defaultPhoto
      );

      createSimillar(
        clickedMovieSimillar.myData,
        imagePath,
        document.querySelector(".simillar .swiper-wrapper")
      );
      createSimillar(
        clickedMovieRecommendations.myData,
        imagePath,
        document.querySelector(".recommendations .swiper-wrapper")
      );
      await createSeasons(
        clickedMovie.id,
        number_of_seasons,
        document.querySelector(".seasons .swiper-wrapper"),
        APIKEY
      );
      createThirdSeasonsObj();
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
      console.log(error);
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
      id,
    } = getCastProfile.myData;

    scrollToTop();
    removeCurrentSection();
    createCastProfile(
      imagePath,
      profile_path,
      defaultPhoto,
      knownFor,
      gender,
      birthday,
      place_of_birth,
      name,
      biography,
      id
    );
    createKnownForMovie(
      getCastKnownFor.myData.cast,
      imagePath,
      document.querySelector(".known-for-posters"),
      moviePosterDefault
    );
  }

  if (e.target.closest(".known-category")) {
    document.querySelector(".known-for-posters").classList.add("min-h-500");
    document.querySelector(".known-for-posters").innerHTML = "";
    let clickedCategory = e.target.closest(".known-category");

    document
      .querySelectorAll(".known-category")
      .forEach((category) =>
        category.classList.remove("known-for-active", "navbar-active")
      );
    clickedCategory.classList.add("known-for-active", "navbar-active");

    if (clickedCategory.classList.contains("known-movies")) {
      let getCastKnownForMovie = await getCustomData(
        "https://api.themoviedb.org/3/person",
        clickedCategory.id,
        "/movie_credits",
        APIKEY
      );

      createKnownForMovie(
        getCastKnownForMovie.myData.cast,
        imagePath,
        document.querySelector(".known-for-posters"),
        moviePosterDefault
      );

      document
        .querySelector(".known-for-details")
        .scrollIntoView({ behavior: "smooth" });
    } else if (clickedCategory.classList.contains("known-tv")) {
      let getCastKnownForTV = await getCustomData(
        "https://api.themoviedb.org/3/person",
        clickedCategory.id,
        "/tv_credits",
        APIKEY
      );

      createKnownForTV(
        getCastKnownForTV.myData.cast,
        imagePath,
        document.querySelector(".known-for-posters"),
        moviePosterDefault
      );

      document
        .querySelector(".known-for-details")
        .scrollIntoView({ behavior: "smooth" });
    }

    document.querySelector(".known-for-posters").classList.remove("min-h-500");
  }

  if (e.target.closest(".season")) {
    let clickedSeason = e.target.closest(".season");

    let getClickedSeasonDetails = await getCustomData(
      "https://api.themoviedb.org/3/tv",
      clickedSeason.id,
      `/season/${clickedSeason.getAttribute("data-season")}`,
      APIKEY
    );

    const { name, air_date, poster_path, episodes } =
      getClickedSeasonDetails.myData;
    scrollToTop();
    removeCurrentSection();
    createSeasonDetails(
      poster_path,
      name,
      air_date,
      episodes,
      imagePath,
      clickedSeason.id
    );
  }

  if (e.target.closest(".back-to-tv")) {
    removeCurrentSection();
    movieSkeleton.classList.remove("hidden");
    scrollToTop();

    try {
      let clickedMovie = e.target.closest(".back-to-tv");
      let clickedMovieDetails = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "",
        APIKEY
      );

      let clickedMovieCast = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/credits",
        APIKEY
      );
      let clickedMovieSimillar = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/similar",
        APIKEY
      );
      let clickedMovieRecommendations = await getCustomData(
        `https://api.themoviedb.org/3/tv`,
        clickedMovie.id,
        "/recommendations",
        APIKEY
      );

      movieSkeleton.classList.add("hidden");
      const {
        name,
        backdrop_path: movieBanner,
        poster_path: moviePoster,
        vote_average: movieRate,
        tagline: quote,
        overview: movieDesc,
        spoken_languages: movieLang,
        episode_run_time: movieDuration,
        first_air_date: movieDate,
        genres,
        number_of_seasons,
      } = clickedMovieDetails.myData;
      createTV(
        movieBanner,
        moviePoster,
        imagePath,
        name,
        movieRate,
        movieDuration[0],
        movieDate,
        movieLang,
        quote,
        movieDesc
      );
      createGenres(genres, document.querySelector(".tv-genre"));
      createCast(
        clickedMovieCast.myData,
        imagePath,
        document.querySelector(".cast .swiper-wrapper"),
        defaultPhoto
      );

      createSimillar(
        clickedMovieSimillar.myData,
        imagePath,
        document.querySelector(".simillar .swiper-wrapper")
      );
      createSimillar(
        clickedMovieRecommendations.myData,
        imagePath,
        document.querySelector(".recommendations .swiper-wrapper")
      );
      await createSeasons(
        clickedMovie.id,
        number_of_seasons,
        document.querySelector(".seasons .swiper-wrapper"),
        APIKEY
      );
      createThirdSeasonsObj();
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
      console.log(error);
    }
  }

  // close search when clicked on search result
  if (e.target.closest(".result-clicked")) {
    searchInput.value = "";
    searchResultParent.classList.add("hidden");
  }

  // close search when clicking anywhere except the search
  if (
    !e.target.closest(".search-input") &&
    !searchResultParent.contains(e.target)
  ) {
    searchResultParent.classList.add("hidden");
  }
});

// return menu and navbar to their places if triggered and the screen width bigger than 768px
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  if (width > 768 && menuTriggered) {
    closeMenu(
      mobileMenu,
      navbar,
      document.querySelector("section:not(.movie-skeleton)")
    );
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
