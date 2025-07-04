import { createFourthSeasonsObj } from "../swiper.js";
import {
  createGenres,
  movieBannerDefault,
  moviePosterDefault,
} from "./movie.js";
import { createPagination } from "./pagination.js";

export const allMovieGenres = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

export const allTVGenres = {
  genres: [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

export function createMoviesSection(
  getMoviesSectionShowcaseData,
  imagePath,
  isMovie
) {
  let movieSectionHTML = `
        <section
      class="movie-section md:pl-[280px] translate-x-0 transition-all duration-300 relative"
    >
      <div class="showcase h-120 max-md:h-fit fade-in">
        <div class="fourth-swiper overflow-hidden relative w-full h-full mb-10">
          <div class="swiper-wrapper h-full">

          </div>

          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>

      <div class="all-movies-section my-10 p-20 max-lg:px-10">
        <div class="filtering flex gap-4 xl:items-center flex-col xl:flex-row fade-in">
          <h1 class="text-3xl text-white font-bold max-lg:text-center">
            ${isMovie ? "All Movies" : "All TV"}
          </h1>
          <div class="filters flex gap-6 max-lg:flex-col max-lg:items-center">
                 <select
                    class="movie-year text-white bg-[#2b2a2a] p-1 px-4 font-bold rounded-2xl"
                >
                    <option disabled>Year</option>
                </select>
                <select
                    class="movie-language text-white bg-[#2b2a2a] p-1 px-4 font-bold rounded-2xl"
                >
                    <option disabled>Language</option>
                    <option value="en" selected>English</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                </select>
                <select
                    class="movie-rate text-white bg-[#2b2a2a] p-1 px-4 font-bold rounded-2xl"
                >
                    <option disabled>Rate</option>
                    <option value="5">5</option>
                    <option value="6" selected>6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <select
                    class="movie-genre-select text-white bg-[#2b2a2a] p-1 px-4 font-bold rounded-2xl"
                >
                    <option disabled>Genre</option>

                </select>
                <select

                    class="movie-sort text-white bg-[#2b2a2a] p-1 px-4 font-bold rounded-2xl"
                >
                    <option disabled>Sort By</option>
                    <option value="popularity.desc" selected>Popular</option>
                    <option value="primary_release_date.desc">Release Date</option>
                    <option value="vote_average.desc">Rate</option>
                    <option value="revenue.desc">Revenue</option>
                </select>
          </div>
        </div>

        <div class="all-displayed-movies grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 min-[0px]:grid-cols-1 gap-6 mt-10 relative"></div>
      </div>
    </section>
    `;

  document.body.insertAdjacentHTML("beforeend", movieSectionHTML);
  createShowcase(
    getMoviesSectionShowcaseData,
    imagePath,
    document.querySelector(".showcase .swiper-wrapper"),
    isMovie
  );
  createFilters(isMovie);
  createPagination(document.querySelector(".all-displayed-movies"));
  createFourthSeasonsObj();
}

export function createShowcase(
  getMoviesSectionShowcaseData,
  imagePath,
  swiperParent,
  isMovie
) {
  getMoviesSectionShowcaseData.results.forEach((movie) => {
    const {
      title,
      name,
      id,
      backdrop_path: movieBanner,
      vote_average,
      overview,
      genre_ids,
    } = movie;

    const matchingGenres = isMovie
      ? allMovieGenres.genres.filter((genre) => genre_ids.includes(genre.id))
      : allTVGenres.genres.filter((genre) => genre_ids.includes(genre.id));

    let showcaseHTML = `
           <div class="swiper-slide h-full">
               <div class="movie-details-container h-full relative">
               <img
                   src="${
                     movieBanner ? imagePath + movieBanner : movieBannerDefault
                   }"
                   class="w-full h-full absolute top-0 opacity-30 object-cover"
                   alt="movie banner"
               />
               <div
                   class="movie-details-parent z-10 relative h-full flex max-lg:flex-col max-lg:items-center gap-10 p-20 max-lg:px-5"
               >
                   <div
                   class="movie-details flex flex-col max-lg:items-center justify-center gap-5"
                   >
                   <div
                       class="showcase-title flex items-end gap-4 max-lg:flex-col max-lg:items-center"
                   >
                       <h1
                       class="text-5xl max-xl:text-4xl text-white font-bold max-lg:text-center"
                       >
                       ${isMovie ? title : name}
                       </h1>
       
                       <div class="movie-rating-parent flex items-center gap-4">
                       <div class="stars">
                           <i
                           class="fa-solid fa-star text-xl max-[500px]:text-base text-yellow-400"
                           ></i>
                       </div>
                       <div class="movie-rating">
                           <h1 class="text-gray-400 text-xl">${vote_average}</h1>
                       </div>
                       </div>
                   </div>
       
                   <div
                       class="movie-genre flex max-lg:flex-wrap max-lg:justify-center gap-4"
                   id="${id}" >
                   </div>
       
                   <div
                       class="movie-quote w-150 max-lg:w-11/12 max-lg:text-center"
                   >
                       <p
                       class="font-bold text-2xl text-gray-400 italic truncate-multiline max-lg:text-[2.5vw] max-[600px]:!text-[3.4vw]"
                       >
                       ${overview}
                       </p>
                   </div>
                   <div class="movie-buttons flex gap-6 max-[500px]:flex-col">
                       <button
                       class="text-white flex items-center gap-4 bg-green-400 p-3 px-12 max-[1430px]:px-6 cursor-pointer group max-[500px]:text-sm"
                       >
                       <i
                           class="fa-solid fa-play text-2xl group-hover:scale-120 transition-all duration-200"
                       ></i>
                       <h1 class="font-bold">PLAY TRAILER</h1>
                       </button>
                       <button
                       class="text-gray-400 ${
                         isMovie ? "open-movie" : "open-tv"
                       }  flex justify-center items-center gap-4 outline-2 outline-gray-400 p-3 px-12 max-[1430px]:px-6 cursor-pointer hover:bg-white hover:text-black hover:outline-transparent transition-all duration-200 max-[500px]:text-sm"
                       id="${id}"
                       >
                       <h1 class="font-bold uppercase">
                           more details
                           <i class="fa-solid fa-chevron-right"></i>
                       </h1>
                       </button>
                   </div>
                   </div>
               </div>
               </div>
           </div>
           `;
    swiperParent.insertAdjacentHTML("beforeend", showcaseHTML);
    createGenres(
      matchingGenres,
      document.querySelector(`[id="${id}"].movie-genre`)
    );
  });
}

export function createFilters(isMovie) {
  let currentYear = new Date();
  for (let year = 1990; year <= currentYear.getFullYear(); year++) {
    let yearOptionHTML = `<option value="${year}">${year}</option>`;
    document
      .querySelector(".movie-year")
      .insertAdjacentHTML("beforeend", yearOptionHTML);
  }
  document.querySelector(".movie-year").value = currentYear.getFullYear();

  let selectedGenre;
  isMovie ? (selectedGenre = allMovieGenres) : (selectedGenre = allTVGenres);
  selectedGenre.genres.forEach((genre) => {
    let genreHTML = `<option value="${genre.id}">${genre.name}</option>`;
    document
      .querySelector(".movie-genre-select")
      .insertAdjacentHTML("beforeend", genreHTML);
  });
}

export function createAllMoviesForMoviesSection(
  movieId,
  imagePath,
  poster_path,
  movieName,
  movieRate,
  isMovie
) {
  let movieHTML = `
    <div
        class="displayed-movie ${
          isMovie ? "open-movie" : "open-tv"
        } fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
        id="${movieId}"
    >
        <img
            src="${poster_path ? imagePath + poster_path : moviePosterDefault}"
            class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300 aspect-[2/3]"
            alt="movie photo"
        />
        <h2 class="text-2xl text-white truncate w-full">${movieName}</h2>
        <div class="rate flex items-center gap-2">
            <i class="fa-solid fa-star text-yellow-300"></i>
            <h2 class="text-gray-400">${movieRate}</h2>
        </div>
    </div>

    `;
  document
    .querySelector(".all-displayed-movies")
    .insertAdjacentHTML("beforeend", movieHTML);
}
