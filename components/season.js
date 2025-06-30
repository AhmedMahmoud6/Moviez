export function createSeasonDetails(
  posterPhoto,
  seasonName,
  air_date,
  episodes,
  imagePath,
  id
) {
  let seasonDetailsHTML = `
    <section class="current-season md:pl-[280px]">
      <div
        class="season-info bg-[#444857] flex items-center gap-10 max-md:gap-4 rounded-xl p-6"
      >
        <img
          src="${posterPhoto ? imagePath + posterPhoto : ""}"
          class="w-80 h-50 object-cover max-lg:min-h-0 max-md:min-w-0 rounded-xl"
          alt="season poster"
        />
        <div class="flex flex-col">
          <h1
            class="text-white text-3xl font-bold mb-4 max-lg:text-[3.1vw] max-md:text-[4.5vw]"
          >
            ${seasonName} ${air_date ? `(${air_date.split("-")[0]})` : ""}
          </h1>
          <p
            class="back-to-tv text-gray-400 text-xl cursor-pointer max-lg:text-[2.1vw] max-md:text-[3.5vw]"
            id="${id}"
          >
            <i class="fa-solid fa-chevron-left"></i>
            Back to season list
          </p>
        </div>
      </div>
      <div class="season-episodes p-20 max-sm:px-6">
        <h1 class="text-3xl text-white mb-5">Episodes (${episodes.length})</h1>
        <div class="all-episodes flex flex-col gap-6"></div>
      </div>
    </section>
    `;

  document.body.insertAdjacentHTML("beforeend", seasonDetailsHTML);

  createSeasonEpisode(
    episodes,
    imagePath,
    document.querySelector(".all-episodes")
  );
}

export function createSeasonEpisode(episodes, imagePath, episodeParent) {
  episodes.forEach((episode) => {
    const {
      air_date,
      episode_number,
      name,
      overview,
      vote_average,
      still_path,
    } = episode;

    let episodeHTML = `
  <div class="episode bg-[#2c303a] p-10 rounded-xl">
    <div class="top flex items-center gap-4 max-md:flex-col max-md:text-center">
      <h2 class="text-white font-bold">${episode_number}</h2>
      <div
        class="episode-rate flex items-center gap-2 bg-green-400 p-1 px-3 w-fit rounded-2xl"
      >
        <i class="fa-solid fa-star text-white"></i>
        <p class="text-white">${vote_average}</p>
      </div>
      <h2 class="text-white">${name}</h2>
    </div>
    <div class="center my-6 max-md:text-center">
      <h2 class="text-gray-400">${air_date || ""}</h2>
      <p class="text-white">
        ${overview}
      </p>
    </div>
    <div class="episode-image">
      <img
        src="${still_path ? imagePath + still_path : ""}"
        class="w-full max-h-100 object-cover"
        alt="episode image"
      />
    </div>
  </div>
  `;

    episodeParent.insertAdjacentHTML("beforeend", episodeHTML);
  });
}
