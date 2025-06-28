export function createMoviesDiscovery(movie, imagePath, SwiperWrapper) {
  const { title, id, poster_path, vote_average } = movie;

  let popularMovieHTML = `
    <div class="swiper-slide">
      <div
        class="displayed-movie open-movie fade-in min-h-[300px] max-xl:min-h-[0px] flex flex-col gap-2 cursor-pointer select-none"
        id="${id}"
      >
        <img
          src="${imagePath}${poster_path}"
          class="w-full min-h-[0px] max-h-[400px] object-cover rounded-xl hover:scale-95 transition-scale duration-300"
          alt="movie photo"
        />
        <h2 class="text-2xl text-white truncate w-full">
          ${title}
        </h2>
        <div class="rate flex items-center gap-2">
          <i class="fa-solid fa-star text-yellow-300"></i>
          <h2 class="text-gray-400">${vote_average}</h2>
        </div>
      </div>
    </div>
    `;
  SwiperWrapper.insertAdjacentHTML("beforeend", popularMovieHTML);
}
