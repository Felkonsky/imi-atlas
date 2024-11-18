export function render(data) {
  // document.querySelectorAll('.grid-item').forEach((item) => item.classList.remove('show'));

  data.forEach((imi) => {
    const gridItem = document.querySelector(`.grid-item[filter-id="${imi.id}"]`);
    gridItem.classList.add('fade-in');
    if (gridItem) {
      gridItem.innerHTML = `
        <svg class="grid-object glyph-view" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
        `;
    }
    setTimeout(() => {
      gridItem.classList.add('show');
    }, 5);
  });
}
