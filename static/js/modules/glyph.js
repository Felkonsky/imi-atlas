// @ts-nocheck
// import * as d3 from '../lib/d3.v7.js';

const objectWrapper = document.getElementById('griddy');

export function createGlyphs(data) {
  const overallItems = JSON.parse(sessionStorage.getItem('allItems'));
  const overallItemsCategories = Object.keys(overallItems);

  const width = 150,
    height = 150,
    radius = Math.min(width, height) / 2;

  data.forEach((imi) => {
    const gridItem = objectWrapper.querySelector(`.grid-item[filter-id="${imi.id}"]`);
    gridItem.classList.add('fade-in');

    const currentItem = {};

    const filterFoldOptions = new Set(JSON.parse(sessionStorage.getItem('foldCategories')));
    const outerRingData = [];
    const innerRingData = [];
    const categoryColors = d3.scaleOrdinal().domain(['mediatypes', 'interactions', 'visualizations']).range(['#ff3c00', '#298140', '#2c87b2']);
    const white = '#ffffff';

    // Helper Object
    const translator = {
      mediatypes: 'media_type',
      interactions: 'interaction_type',
      visualizations: 'visualization_type',
    };

    // Fill outer and inner ring with data based on accordeon settings
    overallItemsCategories.forEach((category) => {
      if (filterFoldOptions.has(category)) {
        outerRingData.push({ category, value: overallItems[category].length });

        overallItems[category].forEach((item) => {
          const isPresent = imi[translator[category]].includes(item);
          innerRingData.push({
            item: item,
            category: category,
            value: 1,
            color: isPresent ? categoryColors(category) : white,
          });
        });
      }
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
    // svg
    //   .selectAll('text')
    //   .data(pie(outerRingData))
    //   .enter()
    //   .append('text')
    //   .attr('transform', (d) => `translate(${outerArc.centroid(d)})`)
    //   .attr('dy', '0.35em')
    //   .style('text-anchor', 'middle');
    setTimeout(() => {
      gridItem.classList.add('show');
    }, 5);
  });
}

export function updateSVGOuterCircle(categoryID, isChecked, data) {
  if (categoryID === 'it-tab' && isChecked) console.log('Show interaction type circle');
  if (categoryID === 'it-tab' && !isChecked) console.log('Hide interaction type circle');
  if (categoryID === 'viz-tab' && isChecked) console.log('Show visulization type circle');
  if (categoryID === 'viz-tab' && !isChecked) console.log('Hide visulization type circle');

  if (categoryID === 'mt-tab' && isChecked) createGlyphs(data);
  if (categoryID === 'mt-tab' && !isChecked) {
    const { media_type, ...dataCopy } = data;
    createGlyphs(dataCopy);
  }
}

export function updateGlyphs(data, filterFoldOptions) {}
