import { convertMinutesToHours, getCustomData } from "../functions.js";
import { createSecondCastObj, createThirdSeasonsObj } from "../swiper.js";
import {
  createMovieStars,
  moviePosterDefault,
  movieBannerDefault,
} from "./movie.js";

export function createTV(
  movieBanner,
  moviePoster,
  imagePath,
  movieName,
  movieRating,
  movieDuration,
  movieDate,
  movieLanguage,
  movieQuote,
  movieOverview
) {
  let movieHTML = `
        <section class="tv md:pl-[280px]">
      <div class="tv-details-container relative">
        <img
          src="${movieBanner ? imagePath + movieBanner : movieBannerDefault}"
          class="w-full h-full absolute top-0 opacity-30 object-cover"
          alt="tv banner"
        />
        <div
          class="tv-details-parent z-10 relative h-full flex max-[1430px]:flex-col max-[1430px]:items-center gap-10 p-20 max-[1430px]:px-5"
        >
          <div class="tv-poster">
            <img
              src="${
                moviePoster ? imagePath + moviePoster : moviePosterDefault
              }"
              class="w-80 h-full max-w-full h-auto rounded-xl"
              alt="tv poster"
            />
          </div>
          <div
            class="tv-details flex flex-col max-[1430px]:items-center justify-center gap-5"
          >
            <h1
              class="text-5xl max-xl:text-4xl text-white  font-bold"
            >
              ${movieName}
            </h1>
            <div class="tv-rating-parent flex items-center gap-10">
              <div class="stars flex gap-2">

              </div>
              <div class="tv-rating">
                <h1 class="text-gray-400 text-xl">
                  <span class="text-white">${movieRating}</span> / 10
                </h1>
              </div>
            </div>
            <div
              class="tv-genre flex max-[1430px]:flex-wrap max-[1430px]:justify-center gap-4"
            >
            </div>
            <div
              class="tv-info flex gap-6 max-[1430px]:flex-wrap max-[1430px]:justify-center"
            >
              <div
                class="tv-duration text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-clock"></i>
                <p>${
                  movieDuration
                    ? convertMinutesToHours(movieDuration)
                    : "Not Specified"
                }</p>
              </div>

              <div
                class="tv-date text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-calendar-week"></i>
                <p>${movieDate}</p>
              </div>

              <div
                class="tv-dub text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-volume-high"></i>
                <p>${movieLanguage.map((language) => language.english_name)}</p>
              </div>
            </div>
            <div class="tv-quote">
              <p class="font-bold text-xl text-gray-400 italic">
                ${movieQuote}
              </p>
            </div>
            <div class="tv-buttons flex gap-6 max-[500px]:flex-col">
              <button
                class="text-white flex items-center gap-4 bg-green-400 p-3 px-12 max-[1430px]:px-6 cursor-pointer group max-[500px]:text-sm"
              >
                <i
                  class="fa-solid fa-play text-2xl group-hover:scale-120 transition-all duration-200"
                ></i>
                <h1 class="font-bold">PLAY TRAILER</h1>
              </button>
              <button
                class="text-gray-400 flex items-center gap-4 outline-2 outline-gray-400 p-3 px-12 max-[1430px]:px-6 cursor-pointer hover:bg-white hover:text-black hover:outline-transparent transition-all duration-200 max-[500px]:text-sm"
              >
                <h1 class="font-bold">ADD TO WATCHLIST</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="tv-desc bg-[#020303] p-20 max-lg:px-4 w-full">
        <div class="description mb-14">
          <h1 class="uppercase text-white text-4xl font-bold mb-8">
            description
          </h1>
          <p
            class="text-gray-400 text-2xl w-150 max-lg:text-[2.1vw] max-lg:w-full max-md:text-[3.1vw] max-sm:!text-[4.1vw] leading-relaxed"
          >
          ${movieOverview}
          </p>
        </div>
        <div class="cast-and-simillar flex justify-between max-2xl:flex-col">
          <div class="cast">
            <h2 class="uppercase text-white text-2xl mb-5">cast</h2>
            <div
              class="second-swiper w-120 overflow-hidden relative pb-10 max-2xl:pb-20 max-2xl:w-full"
            >
              <div class="swiper-wrapper">
              </div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="simillar">
            <h2 class="uppercase text-white text-2xl mb-5">simillar</h2>
            <div
              class="second-swiper w-120 overflow-hidden relative pb-10 max-2xl:pb-20 max-2xl:w-full 2xl:max-h-[270px]"
            >
              <div class="swiper-wrapper">

              </div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
        </div>

        <div class="seasons w-full">
          <h2 class="uppercase text-white text-2xl mb-5">seasons</h2>
          <div
            class="second-swiper overflow-hidden relative pb-10 max-2xl:pb-20 w-full"
          >
            <div class="swiper-wrapper">
            
            </div>

            <!-- Add Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>

        <div class="recommendations">
          <h2 class="uppercase text-white text-2xl mb-5">recommendations</h2>
          <div
            class="second-swiper overflow-hidden relative pb-10 max-2xl:pb-20 w-full"
          >
            <div class="swiper-wrapper">
            
            </div>

            <!-- Add Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </section>
    `;

  document.body.insertAdjacentHTML("beforeend", movieHTML);
  createMovieStars(movieRating, document.querySelector(".stars"));
  createSecondCastObj();
}

export async function createSeasons(tvId, totalSeasons, seasonsParent, APIKEY) {
  let allSeasons = [];
  for (let i = 1; i <= totalSeasons; i++) {
    let getSeason = await getCustomData(
      "https://api.themoviedb.org/3/tv",
      tvId,
      `/season/${i}`,
      APIKEY
    );
    allSeasons.push(getSeason);
  }
  console.log(allSeasons);

  allSeasons.forEach((season) => {
    const { name, overview, air_date, season_number } = season;
    let seasonHTML = `
          <div class="swiper-slide">
              <div class="season w-full p-8 bg-[#2c303a] flex items-center gap-10 rounded-xl max-h-[400px] cursor-pointer" id="${tvId}" data-season="${season_number}">
                  <div class="season-details w-full flex flex-col gap-1 pr-4">
                      <h1 class="text-white text-xl">${
                        name ? name : "No Name"
                      }</h1>
                      <h2 class="text-gray-400 text-xl mb-4">${
                        air_date ? air_date.split("-")[0] : "No Date"
                      }</h2>
                      <p class="text-white text-xl overflow-auto max-h-70">${
                        overview ? overview : ""
                      } </p>
                  </div>
              </div>
          </div>
          `;

    seasonsParent.insertAdjacentHTML("beforeend", seasonHTML);
  });
}
