export function createPagination(paginationParent) {
  let paginationHTML = `
    <div class="pagination flex justify-center items-center max-[450px]:flex-col gap-6 mt-10 fade-in">
      <div class="first-parent max-[450px]:flex max-[450px]:gap-2">
        <button class="first-page bg-green-400 text-white p-2 px-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 font-bold">First</button>
        <button class="prev-page bg-green-400 text-white p-2 px-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 font-bold">-</button>
      </div>
      <h1 class="page-number bg-white text-black p-3 px-6 rounded-lg font-bold">1</h1>
      <div class="last-parent max-[450px]:flex max-[450px]:flex-row-reverse max-[450px]:gap-2">
        <button class="next-page bg-green-400 text-white p-2 px-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 font-bold">+</button>
        <button class="last-page bg-green-400 text-white p-2 px-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 font-bold">Last</button>
      </div>
    </div>
    `;

  paginationParent.insertAdjacentHTML("beforebegin", paginationHTML);
  paginationParent.insertAdjacentHTML("afterend", paginationHTML);
}
