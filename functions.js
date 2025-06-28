import { createMoviesDiscovery } from "./components/discoverMovies.js";

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
    class="trending-image min-w-50 w-11/12 h-[200px] m-auto flex justify-center"
  >
    <img
      src="${imagePath}${backdrop_path}"
      class="w-full h-full object-cover"
      alt="trending movie image"
    />
  </div>
  <h2 class="text-white text-xl m-4">${movie ? title : name}</h2>
  `;

  trendingDiv.id = id;
  trendingDiv.querySelector(".loading-skeleton").classList.add("hidden");
  trendingDiv.insertAdjacentHTML("beforeend", trendingHTML);
}

export async function getCustomData(api, custom) {
  let requestData = await fetch(`${api}&${custom}`);
  let myData = await requestData.json();
  return myData;
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

export async function getMovieDataById(movieId, APIKEY) {
  let movieEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`;
  let moviePromise = await fetch(movieEndpoint);
  let movieData = await moviePromise.json();
  return movieData;
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
