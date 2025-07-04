import { createMoviesDiscovery } from "./components/discoverMovies.js";
import {
  createCast,
  createGenres,
  createMovie,
  createSimillar,
  moviePosterDefault,
} from "./components/movie.js";
import { createAllMoviesForMoviesSection } from "./components/moviesSection.js";
import { createSeasons, createTV } from "./components/tv.js";
import { createThirdSeasonsObj } from "./swiper.js";

export async function getData(api) {
  let requestData = await fetch(api);
  let myData = await requestData.json();
  return myData;
}

export async function renderData(
  funcData,
  funcParam,
  imagePath,
  SwiperWrapper,
  currentCategory
) {
  let myData = await funcData(funcParam);
  let dataObj = myData.results;
  dataObj.forEach((movie) => {
    createMoviesDiscovery(movie, imagePath, SwiperWrapper);
  });
  currentCategory.querySelector(".loading-skeleton").classList.add("hidden");
}

export async function renderTrending(
  funcData,
  funcParam,
  imagePath,
  trendingDiv,
  movie = true
) {
  let myData = await funcData(funcParam);
  let trendingObj = myData.results[0];

  const { title, id, name, backdrop_path } = trendingObj;

  let trendingHTML = `
  <div
    class="trending-image fade-in min-w-50 w-11/12 h-[200px] m-auto flex justify-center"
  >
    <img
      src="${imagePath}${backdrop_path}"
      class="w-full h-full object-cover"
      alt="trending movie image"
    />
  </div>
  <h2 class="text-white fade-in text-xl m-4">${movie ? title : name}</h2>
  `;

  trendingDiv.id = id;
  trendingDiv.querySelector(".loading-skeleton").classList.add("hidden");
  trendingDiv.insertAdjacentHTML("beforeend", trendingHTML);
}

export async function getCustomData(api, movieId = "", custom = "", APIKEY) {
  try {
    let requestData = await fetch(
      `${api}/${movieId}${custom}?api_key=${APIKEY}`
    );
    let myData = await requestData.json();
    return { success: true, myData };
  } catch (error) {
    return { success: false };
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function createKnownForTV(
  tvKnownFor,
  imagePath,
  tvKnownForParent,
  moviePosterDefault
) {
  tvKnownFor.forEach((knownFor) => {
    const { name, vote_average, poster_path, id } = knownFor;
    let tvKnownForHTML = `

      <div
      class="displayed-tv open-tv fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
      id="${id}"
      >
      <img
          src="${poster_path ? imagePath + poster_path : moviePosterDefault}"
          class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300 aspect-[2/3] select-none"
          alt="movie photo"
      />
      <h2 class="text-2xl text-white truncate w-full ">
          ${name}
      </h2>
      <div class="rate flex items-center gap-2">
          <i class="fa-solid fa-star text-yellow-300"></i>
          <h2 class="text-gray-400">${vote_average}</h2>
      </div>
      </div>

    `;

    tvKnownForParent.insertAdjacentHTML("beforeend", tvKnownForHTML);
  });
}

export function yearsOld(birthday) {
  let birthDate = new Date(birthday);
  let today = new Date();
  return today.getFullYear() - birthDate.getFullYear();
}

export function closeMenu(mobileMenu, navbar, discoverContainer) {
  mobileMenu.classList.replace(
    "max-md:translate-x-0",
    "max-md:-translate-x-full"
  );
  discoverContainer.classList.replace("translate-x-[280px]", "translate-x-0");
  navbar.classList.replace("translate-x-[280px]", "translate-x-0");
}

export function updateActiveSwitch(allSwitches, selectedSwitch) {
  allSwitches.forEach((currSwitch) => {
    if (currSwitch.classList.contains("navbar-active")) {
      currSwitch.classList.remove("navbar-active");

      if (currSwitch.classList.contains("menu-active"))
        currSwitch.classList.remove("menu-active");
    }
  });

  let switches = document.querySelectorAll(`.${selectedSwitch}`);
  switches.forEach((currSwitch) => {
    if (currSwitch.classList.contains(`${selectedSwitch}-nav`))
      currSwitch.classList.add("navbar-active");
    if (currSwitch.classList.contains(`${selectedSwitch}-menu`)) {
      currSwitch.classList.add("navbar-active");
      currSwitch.classList.add("menu-active");
    }
  });
}

export function convertMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatRevenue(revenue) {
  const formatted = revenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatted;
}

export function removeCurrentSection() {
  if (document.querySelector("section:not(.movie-skeleton)"))
    document.querySelector("section:not(.movie-skeleton)").remove();
}

export async function getDiscoveryData(
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
) {
  await renderData(
    getData,
    getPopular,
    imagePath,
    mostPopularSwiperWrapper,
    document.querySelector(".most-popular")
  );
  await renderData(
    getData,
    upcomingMovie,
    imagePath,
    upcomingSwiperWrapper,
    document.querySelector(".upcoming")
  );
  await renderData(
    getData,
    topRated,
    imagePath,
    topRatedSwiperWrapper,
    document.querySelector(".top-rated")
  );
  await renderData(
    getData,
    nowPlaying,
    imagePath,
    nowPlayingSwiperWrapper,
    document.querySelector(".now-playing")
  );

  await renderTrending(getData, trendingMovie, imagePath, trendingMovieDiv);
  await renderTrending(getData, trendingTv, imagePath, trendingTvDiv, false);
}

export async function updateMovieSectionMovies(
  APIKEY,
  imagePath,
  currentPage,
  isMovie
) {
  document.querySelector(".filtering").scrollIntoView({ behavior: "smooth" });

  let displayedMovieContainer = document.querySelector(".all-displayed-movies");
  displayedMovieContainer.classList.add("min-h-500");
  displayedMovieContainer.innerHTML = "";

  let allFilters = document.querySelectorAll(".filters select");
  const [
    { value: yearValue },
    { value: languageValue },
    { value: rateValue },
    { value: genreValue },
    { value: sortValue },
  ] = allFilters;
  let updatedFilteredMoviesData = await getData(
    `https://api.themoviedb.org/3/discover/${
      isMovie ? "movie" : "tv"
    }?api_key=${APIKEY}&${
      isMovie ? "primary_release_year" : "first_air_date_year"
    }=${yearValue}&with_original_language=${languageValue}&vote_average.gte=${rateValue}&with_genres=${genreValue}&sort_by=${sortValue}&page=${currentPage}`
  );

  updatedFilteredMoviesData.results.forEach((movie) => {
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

  displayedMovieContainer.classList.remove("min-h-500");
  return {
    totalPages: updatedFilteredMoviesData.total_pages,
    data: updatedFilteredMoviesData,
  };
}

export function updatePaginationDisabled(currentPage, lastPage) {
  restartPaginationDisabled();
  if (currentPage === lastPage && currentPage === 1) {
    document
      .querySelectorAll(".first-parent button")
      .forEach((btn) => (btn.disabled = true));
    document
      .querySelectorAll(".last-parent button")
      .forEach((btn) => (btn.disabled = true));
  } else if (currentPage === 1) {
    document
      .querySelectorAll(".first-parent button")
      .forEach((btn) => (btn.disabled = true));
  } else if (currentPage === lastPage) {
    document
      .querySelectorAll(".last-parent button")
      .forEach((btn) => (btn.disabled = true));
  }
}

export function restartPaginationDisabled() {
  const firstButtons = document.querySelectorAll(".first-parent button");
  const lastButtons = document.querySelectorAll(".last-parent button");
  firstButtons.forEach((btn) => (btn.disabled = false));
  lastButtons.forEach((btn) => (btn.disabled = false));
}

export async function openMovieOrTV(
  isItMovie,
  clickedMovieClassName,
  target,
  APIKEY,
  movieSkeleton,
  imagePath,
  defaultPhoto,
  failedLoading
) {
  removeCurrentSection();
  movieSkeleton.classList.remove("hidden");
  scrollToTop();
  failedLoading.classList.add("hidden");
  try {
    let clickedMovie = target.closest(clickedMovieClassName);
    let clickedMovieDetails = await getCustomData(
      `https://api.themoviedb.org/3/${isItMovie ? "movie" : "tv"}`,
      clickedMovie.id,
      "",
      APIKEY
    );
    let clickedMovieCast = await getCustomData(
      `https://api.themoviedb.org/3/${isItMovie ? "movie" : "tv"}`,
      clickedMovie.id,
      "/credits",
      APIKEY
    );
    let clickedMovieSimillar = await getCustomData(
      `https://api.themoviedb.org/3/${isItMovie ? "movie" : "tv"}`,
      clickedMovie.id,
      "/similar",
      APIKEY
    );
    let clickedMovieRecommendations = await getCustomData(
      `https://api.themoviedb.org/3/${isItMovie ? "movie" : "tv"}`,
      clickedMovie.id,
      "/recommendations",
      APIKEY
    );

    movieSkeleton.classList.add("hidden");
    const {
      title,
      name,
      backdrop_path: movieBanner,
      poster_path: moviePoster,
      vote_average: movieRate,
      tagline: quote,
      overview: movieDesc,
      spoken_languages: movieLang,
      runtime,
      release_date,
      episode_run_time,
      first_air_date,
      revenue,
      genres,
      number_of_seasons,
    } = clickedMovieDetails.myData;

    let displayName = isItMovie ? title : name;
    let movieDuration = isItMovie ? runtime : episode_run_time;
    let movieDate = isItMovie ? release_date : first_air_date;
    if (isItMovie) {
      createMovie(
        movieBanner,
        moviePoster,
        imagePath,
        displayName,
        movieRate,
        movieDuration,
        revenue,
        movieDate,
        movieLang,
        quote,
        movieDesc
      );
    } else {
      createTV(
        movieBanner,
        moviePoster,
        imagePath,
        displayName,
        movieRate,
        movieDuration[0],
        movieDate,
        movieLang,
        quote,
        movieDesc
      );

      await createSeasons(
        clickedMovie.id,
        number_of_seasons,
        document.querySelector(".seasons .swiper-wrapper"),
        APIKEY
      );
      createThirdSeasonsObj();
    }
    createGenres(
      genres,
      document.querySelector(`${isItMovie ? ".movie-genre" : ".tv-genre"}`)
    );
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
    console.log(error);
  }
}

export async function renderKnownForMoviesOrTV(
  isItMovie,
  APIKEY,
  callbackFunc,
  clickedCategory,
  imagePath
) {
  let getCastKnownForMovie = await getCustomData(
    "https://api.themoviedb.org/3/person",
    clickedCategory.id,
    `/${isItMovie ? "movie" : "tv"}_credits`,
    APIKEY
  );

  callbackFunc(
    getCastKnownForMovie.myData.cast,
    imagePath,
    document.querySelector(".known-for-posters"),
    moviePosterDefault
  );
}
