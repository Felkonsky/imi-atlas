// @ts-nocheck
import { fetchData } from './modules/api.js';
import * as filterFunc from './modules/filter.js';
import * as glyphFunc from './modules/glyph.js';

/**
 * Elements used for managing and displaying Interactive Media Installations on the index page.
 * @file Handles data and filter persistence using session storage.
 * @author Felix Andreas Goebel
 */

/** @type {HTMLSpanElement} Button to reset all active filters */
const resetFiltersElement = document.getElementById('filter-reset');

/**
 * Represents an Interactive Museum Installation (IMI)
 * @typedef {Object} InteractiveMuseumInstallation
 * @property {number} id - Unique identifier
 * @property {string} image - Path to a corresponding preview image
 * @property {string[]} interaction_type - Array of interaction types
 * @property {string[]} media_type - Array of media types
 * @property {string[]} visualization_type - Array of visualization types
 * @property {string} name - A descriptive name
 */

/**
 * Array containing data for retrieved Interactive Museum Installations, including details such as ID, image path, name, media types, interaction types, and visualization types.
 * @type {InteractiveMuseumInstallation[]}
 */
let initialData = null;
// let isImageView;

let currentData = null;

const filterAccordeon = document.getElementById('filter-section');
const filterHeaders = filterAccordeon.querySelectorAll('.js-filter-header');
const grid = document.getElementById('griddy');

let accordeonOptions = JSON.parse(sessionStorage.getItem('foldCategories')) || Array.from(filterHeaders, (header) => header.id);
const filterFoldOptions = new Set(accordeonOptions);
const allFilterFoldOptions = new Set(Array.from(filterHeaders, (header) => header.id));

const isInImageViewState = sessionStorage.getItem('objectState');
let isImageView = isInImageViewState === null || JSON.parse(isInImageViewState);

setTimeout(unblock, 100);

filterHeaders.forEach((header) => {
  const headerID = header.id;
  const checkboxHTMLElement = header.querySelector('input[type="checkbox"]');
  if (!checkboxHTMLElement) return;
  checkboxHTMLElement.checked = filterFoldOptions.has(headerID);
  sessionStorage.setItem('foldCategories', JSON.stringify([...filterFoldOptions]));
  filterFunc.renderIndicators(headerID, checkboxHTMLElement.checked);

  checkboxHTMLElement.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      filterFoldOptions.add(headerID);
    } else {
      filterFoldOptions.delete(headerID);
    }
    sessionStorage.setItem('foldCategories', JSON.stringify([...filterFoldOptions]));
    if (!isImageView) glyphFunc.createGlyphs(initialData, true);
    filterFunc.renderIndicators(headerID, isChecked);
  });
});

const vizToggleHTMLElement = document.getElementById('object-view-toggle-label');
const inputHTMLElement = vizToggleHTMLElement.children[0];

if (!isImageView) {
  inputHTMLElement.checked = false;
}

inputHTMLElement.classList.remove('block-on-reload');

vizToggleHTMLElement.addEventListener('click', (event) => {
  if (event.target === vizToggleHTMLElement) {
    isImageView = !isImageView;
    sessionStorage.setItem('objectState', JSON.stringify(isImageView));
    console.info('Toggling the Object View State... Saved in session cache.');
    renderGrid(initialData);

    if (!isImageView) {
      const gridItems = grid.querySelectorAll('.grid-item');
      gridItems.forEach((item) => {
        item.classList.add('fade-in');
      });
    }
  }
});

// Fetch data from the API based on the globally set path 'imiApiPath'
fetchData(imiApiPath).then((data) => {
  if (!sessionStorage.getItem('initialData')) {
    console.log('Adding initial Data to session cache', sessionStorage.getItem('initialData'));
    sessionStorage.setItem('initialData', JSON.stringify(data));
  }
  initialData = data;
  currentData = data;
  renderGrid(data);
});

document.getElementById('filter-section').addEventListener('click', (event) => {
  const filterButton = event.target.closest('span');
  if (filterButton && filterButton.classList.contains('js-filter-button')) {
    const liHTMLElement = filterButton.parentElement;
    const filterDirection = filterButton.getAttribute('data-value');
    const filterType = liHTMLElement.getAttribute('data-type');
    const filterValue = liHTMLElement.getAttribute('data-value');
    const filterState = liHTMLElement.getAttribute('data-state');
    let previousFilterElement = null;

    if (filterState === 'unchecked' && filterDirection === 'right') filterFunc.setActiveFilters(filterType, filterValue, 'checked');
    else if (filterState === 'unchecked' && filterDirection === 'left') filterFunc.setActiveFilters(filterType, filterValue, 'dechecked');
    else {
      filterFunc.clearFilterState(filterType, filterValue);
      previousFilterElement = liHTMLElement;
    }
    filterFunc.updateActiveFiltersCache();
    renderGrid(initialData, previousFilterElement);

    // filterFunc.render(initialData, previousFilterElement);
  }
});

function unblock() {
  filterAccordeon.classList.remove('block-on-reload');
  const filterContentHTMLElements = filterAccordeon.querySelectorAll('.tab__content');
  filterContentHTMLElements.forEach((element) => {
    element.classList.remove('block-on-reload');
  });
}

// Reset filters
resetFiltersElement.addEventListener('click', function () {
  filterFunc.setActiveFilters();
  sessionStorage.removeItem('activeFilters');
  document.querySelectorAll('li.filter-item').forEach((item) => item.setAttribute('data-state', 'unchecked'));
  renderGrid(initialData);
  // filterFunc.render(initialData);
  console.log('Filtersettings have been reset.');
  filterHeaders.forEach((header) => {
    filterFunc.renderIndicators(header.id, header.querySelector('input[type="checkbox"]'));
  });
});

function renderGrid(imiObjects, previousFilterElement = null) {
  const filteredData = filterFunc.applyFilters(imiObjects);
  const gridHTML = filteredData
    .map(
      (imi) => `
    <a href="${window.imiBasePath}${imi.id}">
      <div class="grid-item" filter-id="${imi.id}"></div>
      <span class="aria-hidden">${imi.name}</span>
    </a>`
    )
    .join('');
  grid.innerHTML = gridHTML;

  filterFunc.render(filteredData, previousFilterElement);

  if (isImageView) {
    renderImages(filteredData);
  } else {
    glyphFunc.createGlyphs(filteredData);
  }
}

function renderImages(data) {
  data.forEach((imi) => {
    const gridItem = document.querySelector(`.grid-item[filter-id="${imi.id}"]`);
    gridItem.classList.add('fade-in');
    if (gridItem) gridItem.innerHTML = `<img class="grid-item-img " src="${imi.images[0]}" alt="${imi.name}">`;
    setTimeout(() => {
      gridItem.classList.add('show');
    }, 5);
  });
}
