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
  openMovieOrTV,
  renderKnownForMoviesOrTV,
} from "./functions.js";

import { createKnownForMovie, moviePosterDefault } from "./components/movie.js";

import { createCastProfile } from "./components/cast.js";

import { renderDiscover } from "./components/discover.js";
import { discoverSwiperObj } from "./swiper.js";
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
let trendingMovieDiv = document.querySelector(".trending-movie");
let trendingTvDiv = document.querySelector(".trending-tv");
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
  if (window.innerWidth < 768) {
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
    let selectedSwitch = ["discover", "movies", "tv"].find((type) =>
      selectedDiv.classList.contains(type)
    );
    updateActiveSwitch(allSwitches, selectedSwitch);
    failedLoading.classList.add("hidden");
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

      try {
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
      } catch (error) {
        movieSkeleton.classList.add("hidden");
        failedLoading.classList.remove("hidden");
      }
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
    await openMovieOrTV(
      true,
      ".open-movie",
      e.target,
      APIKEY,
      movieSkeleton,
      imagePath,
      defaultPhoto,
      failedLoading
    );
  }

  if (e.target.closest(".open-tv")) {
    await openMovieOrTV(
      false,
      ".open-tv",
      e.target,
      APIKEY,
      movieSkeleton,
      imagePath,
      defaultPhoto,
      failedLoading
    );
  }

  if (e.target.closest(".cast-open")) {
    failedLoading.classList.add("hidden");

    try {
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
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
    }
  }

  if (e.target.closest(".known-category")) {
    try {
      document.querySelector(".known-for-posters").classList.add("min-h-500");
      document.querySelector(".known-for-posters").innerHTML = "";

      let clickedCategory = e.target.closest(".known-category");

      failedLoading.classList.add("hidden");

      document
        .querySelectorAll(".known-category")
        .forEach((category) =>
          category.classList.remove("known-for-active", "navbar-active")
        );
      clickedCategory.classList.add("known-for-active", "navbar-active");

      if (clickedCategory.classList.contains("known-movies")) {
        try {
          await renderKnownForMoviesOrTV(
            true,
            APIKEY,
            createKnownForMovie,
            clickedCategory
          );
        } catch (error) {
          console.log(error);
        }
      } else if (clickedCategory.classList.contains("known-tv")) {
        try {
          await renderKnownForMoviesOrTV(
            false,
            APIKEY,
            createKnownForTV,
            clickedCategory
          );
        } catch (error) {
          console.log(error);
        }
      }
      document
        .querySelector(".known-for-details")
        .scrollIntoView({ behavior: "smooth" });

      document
        .querySelector(".known-for-posters")
        .classList.remove("min-h-500");
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
    }
  }

  if (e.target.closest(".season")) {
    let clickedSeason = e.target.closest(".season");
    failedLoading.classList.add("hidden");

    try {
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
    } catch (error) {
      movieSkeleton.classList.add("hidden");
      failedLoading.classList.remove("hidden");
    }
  }

  if (e.target.closest(".back-to-tv")) {
    await openMovieOrTV(
      false,
      ".back-to-tv",
      e.target,
      APIKEY,
      movieSkeleton,
      imagePath,
      defaultPhoto,
      failedLoading
    );
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
  )
    searchResultParent.classList.add("hidden");
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

try {
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
} catch (error) {
  movieSkeleton.classList.add("hidden");
  failedLoading.classList.remove("hidden");
}
