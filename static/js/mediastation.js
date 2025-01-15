// @ts-nocheck

import * as favorizer from './modules/favorize.js';

function favHandler(id) {
  const currentID = parseInt(id);
  const favorites = new Set(JSON.parse(sessionStorage.getItem('favs'))) || new Set();
  if (favorites) favorizer.updateFavIconState(favorites, currentID);

  if (!favorites.has(currentID)) {
    favorites.add(currentID);
    sessionStorage.setItem('favs', JSON.stringify(Array.from(favorites)));
    console.info(`Added IMI with ID ${id} to session favorites.`);
    favorizer.updateFavIconState(favorites, currentID);
  } else {
    favorites.delete(currentID);
    sessionStorage.setItem('favs', JSON.stringify(Array.from(favorites)));
    console.info(`Removed IMI with ID ${id} from session favorites.`);
    favorizer.updateFavIconState(favorites, currentID);

    const svgFavElement = document.getElementById('icon-fav');
    const textFavElement = document.getElementById('favorize');
    svgFavElement.style.color = 'var(--skd-c-lightgray)';
    textFavElement.childNodes[0].nodeValue = 'favorisieren';
  }
}

const filterTableHTMLElement = document.querySelector('#js-filter-link');
const favButton = document.getElementById('favorize');

const currentID = parseInt(window.mID);
const favorites = new Set(JSON.parse(sessionStorage.getItem('favs'))) || new Set();

favorizer.updateFavIconState(favorites, currentID);
favButton.addEventListener('click', () => favHandler(window.mID));

if (filterTableHTMLElement) {
  filterTableHTMLElement.addEventListener('click', function (event) {
    if (event.target.matches('a')) {
      const mediaType = event.target.parentElement.getAttribute('data-type');
      const value = event.target.innerHTML;
      const activeFilters = { [mediaType]: { [value]: 'checked' } };
      sessionStorage.removeItem('activeFilters');
      sessionStorage.setItem('activeFilters', JSON.stringify(activeFilters));
    }
  });
}
