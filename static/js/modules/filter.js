// @ts-nocheck
/**
 * Describes the state of a filter, indicating whether it is selected ("checked") or not ("dechecked"), otherwise it can be ignored
 * @typedef {("checked"|"dechecked")} FilterState
 */

/**
 * Represents the structure of the active filters applied by the user. Each category (such as interaction_type, media_type, and visualization_type) represents a key, each associated with a FilterState value that indicates whether the filter is selected or not.
 * @typedef {Object} ActiveFilters
 * @property {Object.<string, FilterState>} [interaction_type] - Filters related to the category 'Interactions'
 * @property {Object.<string, FilterState>} [media_type] - Filters related to the category 'Type of Media'
 * @property {Object.<string, FilterState>} [visualization_type] - Filters related to the category 'Visualizations'
 */

/**
 * A nested object containing all selected or deselected filters retrieved from 'sessionStorage', managed by the Filter Section. Defaults to an empty object if none exists.
 * @type {ActiveFilters}
 */
let activeFilters = JSON.parse(sessionStorage.getItem('activeFilters')) || {};

// Inital collection of all available filters
const liHTMLElementsArray = document.querySelectorAll('.filter-item');

const allFilters = getAllFilters(liHTMLElementsArray);

/** @type {HTMLDivElement} Wrapper containing the button to reset all active filters */
const resetFiltersContainer = document.getElementById('filter-reset-tab');

/** @type {HTMLDivElement} Container where installations are rendered */
const gridElement = document.getElementById('griddy');
const filterSection = document.getElementById('filter-section');

// Helper Object
const translator = {
  mediatypes: 'media_type',
  interactions: 'interaction_type',
  visualizations: 'visualization_type',
};

export function applyFilters(data) {
  return data.filter((item) => {
    for (const [filterType, filterValues] of Object.entries(activeFilters)) {
      for (const [value, state] of Object.entries(filterValues)) {
        if (state === 'checked' && !item[filterType].includes(value)) return false;
        if (state === 'dechecked' && item[filterType].includes(value)) return false;
      }
    }
    return true;
  });
}

function getAllFilters(liHTMLElements) {
  return Array.from(liHTMLElements, (liHTMLElement) => liHTMLElement.children[1]?.textContent).filter(Boolean);
}

export function getAvailableFilters(data) {
  let result = [];
  for (const { media_type, interaction_type, visualization_type } of Object.values(data)) {
    const myList = [...new Set([...media_type, ...interaction_type, ...visualization_type])];
    result = [...new Set([...result, ...myList])];
  }
  return result;
}

export function getUnavailableFilters(availableFilters) {
  const availablefiltersSet = new Set(availableFilters);
  return allFilters.filter((filterItem) => !availablefiltersSet.has(filterItem));
}

function disableFilters(filters) {
  const array = Array.from(liHTMLElementsArray);
  const liArray = array.filter((liElement) => {
    return filters.includes(liElement.getAttribute('data-value'));
  });
  liArray.forEach((li) => {
    if (li.getAttribute('data-state') === 'unchecked') li.classList.add('filter-disabled');
  });
}

function clearDisabledElements() {
  liHTMLElementsArray.forEach((li) => {
    li.classList.remove('filter-disabled');
  });
}

export function updateActiveFiltersCache() {
  sessionStorage.setItem('activeFilters', JSON.stringify(activeFilters));
  console.info(`The following filter settings were stored in session cache: ${JSON.stringify(activeFilters)}`);
}

function applyFilterStyles() {
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  if (isEmpty(activeFilters)) {
    liHTMLElementsArray.forEach((liHTMLElement) => {
      updateActiveFiltersStyle(liHTMLElement, 'unchecked');
    });
  } else {
    for (const [filterType, filterTypeValues] of Object.entries(activeFilters)) {
      for (const [filter, status] of Object.entries(filterTypeValues)) {
        const htmlElement = document.querySelector(`li[data-type=${filterType}][data-value="${filter}"]`);
        updateActiveFiltersStyle(htmlElement, status);
      }
    }
  }
}
function updateFilterStyle(arrowHTMLElement, filterState, arrowDirection) {
  if (filterState === 'unchecked' && arrowDirection === 'right') {
    arrowHTMLElement.classList.toggle('hidden');
    arrowHTMLElement.parentElement.setAttribute('data-state', 'checked');
    arrowHTMLElement.parentElement.classList.add('checked');
  }
}

function updateActiveFiltersStyle(liHTMLElement, filterState) {
  liHTMLElement.setAttribute('data-state', filterState);
  liHTMLElement.classList.add(filterState);

  if (filterState === 'checked') liHTMLElement.children[2].classList.add('hidden');
  else if (filterState === 'dechecked') {
    liHTMLElement.children[0].classList.add('hidden');
  } else if (filterState === 'unchecked') {
    liHTMLElement.children[0].classList.remove('hidden');
    liHTMLElement.children[2].classList.remove('hidden');
    liHTMLElement.classList.remove('checked', 'unchecked', 'dechecked');
  }
}

export function highlightFilter(types, highlightClass) {
  types.forEach((type) => {
    const liElement = document.querySelector(`[data-value="${type}"]`);
    if (liElement && !liElement.classList.contains('checked')) liElement.classList.add(highlightClass); // Ensure the element exists before adding class
  });
}

export function removeHighlight(types, highlightClass) {
  types.forEach((type) => {
    const liElement = document.querySelector(`[data-value="${type}"]`);
    if (liElement) liElement.classList.remove(highlightClass); // Ensure the element exists before removing class
  });
}

export function setActiveFilters(type, value, state) {
  if (type && value && state) {
    if (!activeFilters[type]) activeFilters[type] = {};
    activeFilters[type][value] = state;
  } else {
    activeFilters = {};
  }
}

export function clearFilterState(type, value) {
  if (activeFilters[type]) {
    delete activeFilters[type][value];
    if (Object.keys(activeFilters[type]).length === 0) delete activeFilters[type];
  }
}

// Show Count of Mediastations
function updateResults(mediastations) {
  const resultCount = mediastations.length;
  const resultElement = document.getElementById('results');
  resultElement.innerHTML = `${resultCount} Ergebnis${resultCount !== 1 ? 'se' : ''}`;
}

function updateGridEvent(data) {
  const gridItems = document.querySelectorAll('div.grid-item');
  const metaData = document.getElementById('object-metadata');
  gridItems.forEach((gridItem) => {
    const mediastationID = gridItem.getAttribute('filter-id');
    const mediastationData = data.find((imi) => imi.id == mediastationID);

    if (!mediastationData) return; // Skip if no matching data is found
    // Object View: Hover Functionality
    gridItem.addEventListener('mouseover', () => {
      const { name: imiTitle, interaction_type: interactionTypes, media_type: mediaTypes, visualization_type: visualizationTypes } = mediastationData;
      // Update metadata display
      metaData.innerHTML = imiTitle;
      metaData.classList.add('fade-in-text');
      // Highlight related filter types
      if (mediaTypes) highlightFilter(mediaTypes, 'mt-filter-highlight');
      if (interactionTypes) highlightFilter(interactionTypes, 'it-filter-highlight');
      if (visualizationTypes) highlightFilter(visualizationTypes, 'vt-filter-highlight');
    });

    gridItem.addEventListener('mouseout', () => {
      metaData.classList.remove('fade-in-text');
      // Remove highlights from filter types
      if (mediastationData.media_type) removeHighlight(mediastationData.media_type, 'mt-filter-highlight');
      if (mediastationData.interaction_type) removeHighlight(mediastationData.interaction_type, 'it-filter-highlight');
      if (mediastationData.visualization_type) removeHighlight(mediastationData.visualization_type, 'vt-filter-highlight');
    });
  });
}

export function render(data, previousFilterElement = null) {
  const availableFilters = getAvailableFilters(data);
  const unavailableFilters = getUnavailableFilters(availableFilters);

  clearDisabledElements();

  if (previousFilterElement) {
    updateActiveFiltersStyle(previousFilterElement, 'unchecked');
  }
  applyFilterStyles();
  // Show Reset Button if there are any Filters checked
  resetFiltersContainer.classList.toggle('hidden', Object.keys(activeFilters).length === 0);

  disableFilters(unavailableFilters);
  updateResults(data);
  updateGridEvent(data);
}

export function renderIndicators(category, isExpanded) {
  const spanElement = filterSection?.querySelector(`#js-${category}-span`);
  if (!spanElement) {
    console.warn(`Span Element für Kategorie "${category}" nicht gefunden. Anzahl der aktiven Filter wird nicht angezeigt.`);
    return;
  }
  if (isExpanded) {
    spanElement.style.opacity = '0';
  } else {
    const filterItem = activeFilters?.[translator?.[category]];
    const number = filterItem ? Object.keys(filterItem).length : 0;

    spanElement.textContent = number === 0 ? '' : `(${number.toString()})`;
    spanElement.style.opacity = '1';
  }
}
