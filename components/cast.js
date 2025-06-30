export function createCastProfile(
  imagePath,
  profile_path,
  moviePosterDefault,
  knownFor,
  gender,
  birthday,
  birthPlace,
  castName,
  biography,
  id
) {
  let castHTML = `
    <section class="cast-profile md:pl-[280px] py-10 px-4">
      <div class="profile flex gap-10 items-start max-lg:flex-col mb-10">
        <div
          class="profile-card bg-[#2c303a] flex flex-col flex-shrink-0 gap-4 w-80 p-8 rounded-xl max-lg:flex-row max-lg:w-full max-[500px]:!flex-col"
        >
          <img
            src="${
              profile_path ? imagePath + profile_path : moviePosterDefault
            }"
            class="w-50 h-50 object-cover mx-auto max-lg:mx-0 rounded-xl mb-5 max-[500px]:!mx-auto"
            alt="profile pic"
          />
          <div
            class="profile-card-details flex flex-col gap-4 max-lg:justify-center max-lg:ml-10 max-[500px]:!ml-0"
          >
            <div class="known-for">
              <h1 class="text-white text-lg">Known For</h1>
              <p class="text-gray-400 text-sm">${knownFor}</p>
            </div>
            <div class="gender">
              <h1 class="text-white text-lg">Gender</h1>
              <p class="text-gray-400 text-sm">${gender}</p>
            </div>
            <div class="birthday">
              <h1 class="text-white text-lg">Birthday</h1>
              <p class="text-gray-400 text-sm">${birthday}</p>
            </div>
            <div class="birth-place">
              <h1 class="text-white text-lg">Place of Birth</h1>
              <p class="text-gray-400 text-sm">${birthPlace}</p>
            </div>
          </div>
        </div>
        <div class="profile-desc flex flex-col gap-4 max-lg:px-2">
          <h1
            class="text-green-400 text-[2.3vw] max-lg:text-[4.3vw] max-md:text-[6.3vw] max-[500px]:!text-[8.3vw] font-bold"
          >
            ${castName}
          </h1>
          <h2
            class="text-white text-[1.5vw] max-lg:text-[2.5vw] max-md:text-[3.5vw] max-[500px]:!text-[5.5vw]"
          >
            Biography
          </h2>
          <p
            class="text-gray-400 text-[1.3vw] max-lg:text-[2vw] max-md:text-[3vw] max-[500px]:!text-[5vw] w-11/12"
          >
          ${biography}
          </p>
        </div>
      </div>
      <div class="known-for-details mb-10">
        <h1
          class="text-green-400 text-[2.3vw] max-lg:text-[4.3vw] max-md:text-[6.3vw] max-[500px]:!text-[8.3vw] font-bold mb-10"
        >
          Known For
        </h1>

        <div class="known-categories flex gap-6 text-xl">
          <div
            class="known-category known-movies w-28 text-gray-400 navbar-active p-2 flex justify-center items-center known-for-active hover:bg-green-300/50 hover:text-white transition-all duration-200 cursor-pointer"
            id="${id}"
          >
            Movies
          </div>
          <div
            class="known-category known-tv w-28 text-gray-400 p-2 flex justify-center items-center  hover:bg-green-300/50 hover:text-white transition-all duration-200 cursor-pointer"
            id="${id}"
          >
            TV Show
          </div>
        </div>
      </div>

      <div
        class="known-for-posters min-h-500 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 min-[0px]:grid-cols-1 gap-6"
      >
      </div>
    </section>
    `;

  document.body.insertAdjacentHTML("beforeend", castHTML);
}
