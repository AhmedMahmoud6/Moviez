export async function getData(api) {
  let requestData = await fetch(api);
  let myData = await requestData.json();
  return myData;
}

export async function getCustomData(api, custom) {
  let requestData = await fetch(`${api}&${custom}`);
  let myData = await requestData.json();
  return myData;
}

export function closeMenu(mobileMenu, navbar) {
  mobileMenu.classList.replace(
    "max-md:translate-x-0",
    "max-md:-translate-x-full"
  );
  navbar.classList.replace("translate-x-[280px]", "translate-x-0");
}
