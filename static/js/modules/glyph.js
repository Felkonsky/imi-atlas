export function render(data) {
  data.forEach((imi) => {
    const gridItem = document.querySelector(`.grid-item[filter-id="${imi.id}"]`);
    if (gridItem) {
      gridItem.innerHTML = `
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
        `;
    }
  });
}
