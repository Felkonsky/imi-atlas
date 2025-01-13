// @ts-nocheck

export function updateFavIconState(currentFavorites, id) {
  const imiID = parseInt(id);
  const svgFavElement = document.getElementById('icon-fav');
  const textFavElement = document.getElementById('favorize');
  if (currentFavorites.has(imiID)) {
    svgFavElement.style.color = 'black';
    textFavElement.childNodes[0].nodeValue = 'favorisiert';
  }
}
