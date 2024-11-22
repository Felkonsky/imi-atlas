// @ts-nocheck
// import * as d3 from '../lib/d3.v7.js';

const objectWrapper = document.getElementById('griddy');

export function createGlyphs(data) {
  data.forEach((imi) => {
    const gridItem = objectWrapper.querySelector(`.grid-item[filter-id="${imi.id}"]`),
      width = 150,
      height = 150,
      radius = Math.min(width, height) / 2,
      allItems = JSON.parse(sessionStorage.getItem('allItems'));

    gridItem.classList.add('fade-in');

    const currentItem = {
      mediatypes: imi['media_type'],
      interactions: imi['interaction_type'],
      visualizations: imi['visualization_type'],
    };

    const categoryColors = d3.scaleOrdinal().domain(['mediatypes', 'interactions', 'visualizations']).range(['#ff3c00', '#298140', '#2c87b2']);

    const white = '#ffffff';

    const outerRingData = [
      { category: 'mediatypes', value: allItems.mediatypes.length },
      { category: 'interactions', value: allItems.interactions.length },
      { category: 'visualizations', value: allItems.visualizations.length },
    ];

    const innerRingData = [];

    // Generate data for the inner pie chart
    Object.keys(allItems).forEach((category) => {
      allItems[category].forEach((item) => {
        const isActive = currentItem[category].includes(item);
        innerRingData.push({
          item: item,
          category: category,
          value: 1,
          color: isActive ? categoryColors(category) : white,
        });
      });
    });

    // Create the pie and arc functions
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // For the inner pie chart
    const innerArc = d3.arc().innerRadius(25).outerRadius(radius);

    // For the outer donut chart
    const outerArc = d3
      .arc()
      .innerRadius(radius - 5)
      .outerRadius(radius);

    // Create the SVG container
    const svg = d3
      .select(gridItem)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Draw inner pie chart
    svg
      .selectAll('path.inner')
      .data(pie(innerRingData))
      .enter()
      .append('path')
      .attr('class', 'inner')
      .attr('d', innerArc)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2);

    // Draw outer donut chart
    svg
      .selectAll('path.outer')
      .data(pie(outerRingData))
      .enter()
      .append('path')
      .attr('class', 'outer')
      .attr('d', outerArc)
      .attr('fill', (d) => categoryColors(d.data.category))
      .attr('stroke', white)
      .attr('stroke-width', 2);

    // Add labels for the outer donut chart (optional)
    svg
      .selectAll('text')
      .data(pie(outerRingData))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${outerArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle');
    setTimeout(() => {
      gridItem.classList.add('show');
    }, 5);
  });
}
// const categories = {
//   media_types: ['Text', 'Bild', 'Audio', 'Video', '3D Objekt'],
//   interaction_types: ['Vergrößern', 'Vergleichen', 'Fokussieren', 'Verknüpfen', 'Bewegen'],
//   visualization_types: ['Karte', 'Zeitstrahl', 'Buch', 'Kacheln'],
// };

// export function render(data) {
//   // document.querySelectorAll('.grid-item').forEach((item) => item.classList.remove('show'));
//   data.forEach((imi) => {
//     // const pie = d3.pie();
//     // pie.padAngle(0.05);
//     // let color = d3.scaleOrdinal;

//     const gridItem = document.querySelector(`.grid-item[filter-id="${imi.id}"]`);
//     console.log(d3.select('#griddy'));

//     // const svg = d3
//     //   .select(`.grid-item[filter-id="${imi.id}"]`)
//     //   .append('svg')
//     //   .attr('width', width)
//     //   .attr('height', height)
//     //   .append('g')
//     //   .attr('transform', `translate(${width / 2}, ${height / 2})`);

//     if (imi.id === 1) {
//       console.log('CURRENT OBJECT');
//       console.log(imi['media_type']);
//       console.log(imi['interaction_type']);
//       console.log(imi['visualization_type']);
//     }

//     gridItem.classList.add('fade-in');
//     if (gridItem) {
//     }
//     setTimeout(() => {
//       gridItem.classList.add('show');
//     }, 5);
//   });
