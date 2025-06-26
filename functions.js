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
