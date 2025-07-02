import { removeCurrentSection } from "../functions.js";
export function renderDiscover() {
  removeCurrentSection();

  let discoverHTML = `
    <section
      class="discover-container relative fade-in flex max-xl:flex-wrap md:pl-[280px] transition-all duration-300 transform translate-x-0"
    >
      <section class="discover-content w-9/12 max-xl:w-full bg-[#1b1c22] p-8">
        <div class="content">
          <div class="most-popular">
            <h1 class="text-5xl text-white mb-8 max-sm:text-3xl">
              Most Popular
            </h1>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
            </div>
            <div class="swiper relative pb-10">
              <div class="swiper-wrapper"></div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="top-rated pt-4 border-t-2 border-gray-700">
            <h1 class="text-5xl text-white mb-8 max-sm:text-3xl">Top Rated</h1>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
            </div>
            <div class="swiper relative pb-10">
              <div class="swiper-wrapper"></div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="now-playing pt-4 border-t-2 border-gray-700">
            <h1 class="text-5xl text-white mb-8 max-sm:text-3xl">
              Now Playing
            </h1>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
            </div>
            <div class="swiper relative pb-10">
              <div class="swiper-wrapper"></div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="upcoming pt-4 border-t-2 border-gray-700">
            <h1 class="text-5xl text-white mb-8 max-sm:text-3xl">Upcoming</h1>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 min-[450px]:grid-cols-2 max-[450px]:grid-cols-1 gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
                <div
                  class="skeleton-rate w-20 bg-[#2c303a] rounded-md h-5 mt-5"
                ></div>
              </div>
            </div>
            <div class="swiper relative pb-10">
              <div class="swiper-wrapper"></div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>

              <!-- Add Navigation -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="trending bg-[#1a1a1f] flex-1 flex-shrink-0 p-4 py-8">
        <div
          class="trending-content max-[450px]:!min-w-[0px] max-xl:min-w-[300px] max-[450px]:flex-col max-xl:flex max-xl:justify-center max-xl:gap-10 max-xl:h-fit sticky top-[50px]"
        >
          <div
            class="trending-movie fade-in open-movie mb-8 max-xl:basis-1/2 cursor-pointer"
          >
            <div class="trending-title mb-5 flex items-center gap-3 text-white">
              <span class="block w-5 h-1 bg-green-400"></span>
              <h1 class="text-2xl">Trending movie</h1>
            </div>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
              </div>
            </div>
          </div>
          <div class="trending-tv fade-in open-tv mb-8 max-xl:basis-1/2 cursor-pointer">
            <div class="trending-title mb-5 flex items-center gap-3 text-white">
              <span class="block w-5 h-1 bg-green-400"></span>
              <h1 class="text-2xl">Trending TV</h1>
            </div>
            <div
              class="loading-skeleton w-full rounded-md h-[388px] overflow-hidden grid gap-6"
            >
              <div class="skeleton animate-pulse">
                <div
                  class="skeleton-card bg-[#2c303a] rounded-xl min-h-[300px]"
                ></div>
                <div
                  class="skeleton-title bg-[#2c303a] rounded-md h-7 mt-5"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    `;

  document.body.insertAdjacentHTML("beforeend", discoverHTML);
}
