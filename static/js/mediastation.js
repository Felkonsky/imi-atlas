// @ts-nocheck

import * as slider from './modules/slider.js';
import * as favorizer from './modules/favorize.js';

let filterTableHTMLElement = document.querySelector('#js-filter-link');

let favButton = document.getElementById('favorize');
favButton = favButton.addEventListener('click', favHandler(window.mID));

// rendering errors otherwise - i.e. buggy slidess
window.addEventListener('load', function () {
  let initialSlideIndex = 0;
  if (window.slideIdx) {
    initialSlideIndex = parseInt(window.slideIdx);
    console.log('IMPORTANT', window.slideIdx);
  }
  slider.initSlider({
    sliderWrapperSelector: '.slider-wrapper',
    slidesSelector: '.slide',
    prevButtonSelector: '.slider-button.prev',
    nextButtonSelector: '.slider-button.next',
    idx: initialSlideIndex,
  });
});

const currentID = parseInt('{{ mediastation.id }}');
let favorites = new Set(JSON.parse(sessionStorage.getItem('favs'))) || new Set();
if (favorites) favorizer.updateFavIconState(favorites, currentID);

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

function favHandler(id) {
  let favorites = new Set(JSON.parse(sessionStorage.getItem('favs'))) || new Set();
  if (favorites) favorizer.updateFavIconState(favorites, currentID);

  console.log('hello');
  const imiID = parseInt(id);
  if (!favorites.has(imiID)) {
    favorites.add(imiID);
    sessionStorage.setItem('favs', JSON.stringify(Array.from(favorites)));
    console.info(`Added IMI with ID ${id} to session favorites.`);
    favorizer.updateFavIconState(favorites, id);
  } else {
    favorites.delete(imiID);
    sessionStorage.setItem('favs', JSON.stringify(Array.from(favorites)));
    console.info(`Removed IMI with ID ${id} from session favorites.`);
    favorites.Array(favorites, id);

    const svgFavElement = document.getElementById('icon-fav');
    const textFavElement = document.getElementById('favorize');
    svgFavElement.style.color = 'var(--skd-c-lightgray)';
    textFavElement.childNodes[0].nodeValue = 'favorisieren';
  }
}
