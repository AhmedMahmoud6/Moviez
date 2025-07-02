export function createSearchResult(searchObj, imagePath, searchResultParent) {
  if (searchObj.length > 0)
    searchObj.forEach((searchQuery) => {
      const { title, name, vote_average, poster_path, id } = searchQuery;
      if (!poster_path || !vote_average) return;
      let searchResultHTML = `
          <div
          class="search-result ${
            title ? "open-movie" : "open-tv"
          } result-clicked w-full h-18 bg-[#444857] rounded-xl cursor-pointer p-2 flex gap-4 min-w-0 "
          id="${id}"
          >
              <div class="search-photo">
                  <img
                  src="${imagePath + poster_path}"
                  class="w-10 h-full rounded-lg"
                  alt="search photo"
                  />
              </div>
      
              <div
                  class="search-details flex justify-between items-center min-w-0 w-full"
              >
                  <div class="search-info flex flex-col justify-between min-w-0">
                  <h1 class="text-white text-xl truncate w-full max-[530px]:text-[4.8vw]">${
                    title ? title : name
                  }</h1>
      
                  <div class="search-rate flex gap-2 items-center">
                      <i
                      class="fa-solid fa-star text-lg max-[530px]:text-[3.2vw] text-yellow-400"
                      ></i>
      
                      <h2 class="text-gray-400 font-bold max-[530px]:text-[3.5vw] w-full truncate">${vote_average}</h2>
                  </div>
                  </div>
                  <div
                  class="search-type flex items-center bg-green-400 p-1 px-4 max-[530px]:px-2 rounded-xl font-bold"
                  >
                  <h2 class="text-white ">${title ? "Movie" : "TV"}</h2>
                  </div>
              </div>
          </div>
          `;

      searchResultParent.insertAdjacentHTML("beforeend", searchResultHTML);
    });
  else {
    let noResultsHTML = `<p class="text-white font-bold text-xl p-4">No results found</p>`;
    searchResultParent.insertAdjacentHTML("beforeend", noResultsHTML);
  }
}
