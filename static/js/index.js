// @ts-nocheck
import { fetchData } from './modules/api.js';
import * as filterFunc from './modules/filter.js';

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

// Fetch data from the API based on the globally set path 'imiApiPath'
fetchData(imiApiPath).then((data) => {
  sessionStorage.setItem('initialData', JSON.stringify(data));
  initialData = data;
  filterFunc.render(data);
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
    filterFunc.render(initialData, previousFilterElement);
  }
});

// Reset filters
resetFiltersElement.addEventListener('click', function () {
  filterFunc.setActiveFilters();
  sessionStorage.removeItem('activeFilters');
  document.querySelectorAll('li.filter-item').forEach((item) => item.setAttribute('data-state', 'unchecked'));
  filterFunc.render(initialData);
  console.log('Filtersettings have been reset.');
});
