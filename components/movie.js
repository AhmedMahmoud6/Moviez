import {
  convertMinutesToHours,
  formatRevenue,
  createSecondCastObj,
} from "../functions.js";
export function createMovie(
  movieBanner,
  moviePoster,
  imagePath,
  movieName,
  movieRating,
  movieDuration,
  movieRevenue,
  movieDate,
  movieLanguage,
  movieQuote,
  movieOverview
) {
  document.querySelector("section").remove();
  let movieHTML = `
        <section class="movie md:pl-[280px]">
      <div class="movie-details-container relative">
        <img
          src="${imagePath}${movieBanner}"
          class="w-full h-full absolute top-0 opacity-30 object-cover"
          alt="movie banner"
        />
        <div
          class="movie-details-parent z-10 relative h-full flex max-[1430px]:flex-col max-[1430px]:items-center gap-10 p-20 max-[1430px]:px-5"
        >
          <div class="movie-poster">
            <img
              src="${imagePath}${moviePoster}"
              class="w-80 h-full max-w-full h-auto rounded-xl"
              alt="movie poster"
            />
          </div>
          <div
            class="movie-details flex flex-col max-[1430px]:items-center justify-center gap-5"
          >
            <h1
              class="text-5xl max-xl:text-4xl text-white text-center font-bold"
            >
              ${movieName}
            </h1>
            <div class="movie-rating-parent flex items-center gap-10">
              <div class="stars flex gap-2">
                <i
                  class="fa-solid fa-star text-xl max-[500px]:text-base text-yellow-400"
                ></i>
                <i
                  class="fa-solid fa-star text-xl max-[500px]:text-base text-yellow-400"
                ></i>
                <i
                  class="fa-solid fa-star text-xl max-[500px]:text-base text-yellow-400"
                ></i>
                <i
                  class="fa-solid fa-star text-xl max-[500px]:text-base text-gray-500"
                ></i>
                <i
                  class="fa-solid fa-star text-xl max-[500px]:text-base text-gray-500"
                ></i>
              </div>
              <div class="movie-rating">
                <h1 class="text-gray-400 text-xl">
                  <span class="text-white">${movieRating}</span> / 10
                </h1>
              </div>
            </div>
            <div
              class="movie-genre flex max-[1430px]:flex-wrap max-[1430px]:justify-center gap-4"
            >
            </div>
            <div
              class="movie-info flex gap-6 max-[1430px]:flex-wrap max-[1430px]:justify-center"
            >
              <div
                class="movie-duration text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-clock"></i>
                <p>${convertMinutesToHours(movieDuration)}</p>
              </div>

              <div
                class="movie-revenue text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-wallet"></i>
                <p>${formatRevenue(movieRevenue)}</p>
              </div>

              <div
                class="movie-date text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-calendar-week"></i>
                <p>${movieDate}</p>
              </div>

              <div
                class="movie-dub text-gray-300 text-xl max-xl:text-base flex gap-4 items-center"
              >
                <i class="fa-solid fa-volume-high"></i>
                <p>${movieLanguage[0].name}</p>
              </div>
            </div>
            <div class="movie-quote">
              <p class="font-bold text-xl text-gray-400 italic">
                ${movieQuote}
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
                class="text-gray-400 flex items-center gap-4 outline-2 outline-gray-400 p-3 px-12 max-[1430px]:px-6 cursor-pointer hover:bg-white hover:text-black hover:outline-transparent transition-all duration-200 max-[500px]:text-sm"
              >
                <h1 class="font-bold">ADD TO WATCHLIST</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-desc bg-[#020303] p-20 max-lg:px-4">
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
                <div class="swiper-slide">
                  <div
                    class="displayed-movie open-movie fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                    id="${""}"
                  >
                    <img
                      src="days.webp"
                      class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                      alt="movie photo"
                    />
                    <h2 class="text-2xl text-white truncate w-full">
                      28 Days Later
                    </h2>
                    <div class="rate flex items-center gap-2">
                      <i class="fa-solid fa-star text-yellow-300"></i>
                      <h2 class="text-gray-400">7.921</h2>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div
                    class="displayed-movie open-movie fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                    id="${""}"
                  >
                    <img
                      src="days.webp"
                      class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                      alt="movie photo"
                    />
                    <h2 class="text-2xl text-white truncate w-full">
                      28 Days Later
                    </h2>
                    <div class="rate flex items-center gap-2">
                      <i class="fa-solid fa-star text-yellow-300"></i>
                      <h2 class="text-gray-400">7.921</h2>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div
                    class="displayed-movie open-movie fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                    id="${""}"
                  >
                    <img
                      src="days.webp"
                      class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                      alt="movie photo"
                    />
                    <h2 class="text-2xl text-white truncate w-full">
                      28 Days Later
                    </h2>
                    <div class="rate flex items-center gap-2">
                      <i class="fa-solid fa-star text-yellow-300"></i>
                      <h2 class="text-gray-400">7.921</h2>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div
                    class="displayed-movie open-movie fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                    id="${""}"
                  >
                    <img
                      src="days.webp"
                      class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                      alt="movie photo"
                    />
                    <h2 class="text-2xl text-white truncate w-full">
                      28 Days Later
                    </h2>
                    <div class="rate flex items-center gap-2">
                      <i class="fa-solid fa-star text-yellow-300"></i>
                      <h2 class="text-gray-400">7.921</h2>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div
                    class="displayed-movie open-movie fade-in min-h-[250px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                    id="${""}"
                  >
                    <img
                      src="days.webp"
                      class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                      alt="movie photo"
                    />
                    <h2 class="text-2xl text-white truncate w-full">
                      28 Days Later
                    </h2>
                    <div class="rate flex items-center gap-2">
                      <i class="fa-solid fa-star text-yellow-300"></i>
                      <h2 class="text-gray-400">7.921</h2>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
        </div>

        <div class="recommendations">
          <h2 class="uppercase text-white text-2xl mb-5">recommendations</h2>
          <div
            class="second-swiper overflow-hidden relative pb-10 max-2xl:pb-20 w-full"
          >
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div
                  class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                  id="${""}"
                >
                  <img
                    src="days.webp"
                    class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                    alt="movie photo"
                  />
                  <h2 class="text-2xl text-white truncate w-full">
                    28 Days Later
                  </h2>
                  <div class="rate flex items-center gap-2">
                    <i class="fa-solid fa-star text-yellow-300"></i>
                    <h2 class="text-gray-400">7.921</h2>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div
                  class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                  id="${""}"
                >
                  <img
                    src="days.webp"
                    class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                    alt="movie photo"
                  />
                  <h2 class="text-2xl text-white truncate w-full">
                    28 Days Later
                  </h2>
                  <div class="rate flex items-center gap-2">
                    <i class="fa-solid fa-star text-yellow-300"></i>
                    <h2 class="text-gray-400">7.921</h2>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div
                  class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                  id="${""}"
                >
                  <img
                    src="days.webp"
                    class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                    alt="movie photo"
                  />
                  <h2 class="text-2xl text-white truncate w-full">
                    28 Days Later
                  </h2>
                  <div class="rate flex items-center gap-2">
                    <i class="fa-solid fa-star text-yellow-300"></i>
                    <h2 class="text-gray-400">7.921</h2>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div
                  class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                  id="${""}"
                >
                  <img
                    src="days.webp"
                    class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                    alt="movie photo"
                  />
                  <h2 class="text-2xl text-white truncate w-full">
                    28 Days Later
                  </h2>
                  <div class="rate flex items-center gap-2">
                    <i class="fa-solid fa-star text-yellow-300"></i>
                    <h2 class="text-gray-400">7.921</h2>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div
                  class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
                  id="${""}"
                >
                  <img
                    src="days.webp"
                    class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
                    alt="movie photo"
                  />
                  <h2 class="text-2xl text-white truncate w-full">
                    28 Days Later
                  </h2>
                  <div class="rate flex items-center gap-2">
                    <i class="fa-solid fa-star text-yellow-300"></i>
                    <h2 class="text-gray-400">7.921</h2>
                  </div>
                </div>
              </div>
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

  createSecondCastObj();
}

export function createGenres(movieGenres, genresParent) {
  movieGenres.forEach((genre) => {
    const { name } = genre;
    let genreHTML = `
        <div class="genre bg-green-400 px-4 text-white rounded-xl">
        ${name}
        </div>
        `;
    genresParent.insertAdjacentHTML("beforeend", genreHTML);
  });
}

export function createCast(movieCast, imagePath, castParent) {
  let defaultPhoto =
    "https://i.pinimg.com/736x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg";
  movieCast.cast.forEach((cast) => {
    console.log(cast);
    const { name, profile_path } = cast;
    let castHTML = `
      <div class="swiper-slide">
          <div class="cast-details flex flex-col items-center text-center">
          <img
              src="${profile_path ? imagePath + profile_path : defaultPhoto}"
              class="w-25 h-25 rounded-full object-cover"
              alt="cast photo"
          />
          <h2 class="text-gray-400 text-xl truncate w-full">${name}</h2>
          </div>
      </div>
      `;

    castParent.insertAdjacentHTML("beforeend", castHTML);
  });
}
