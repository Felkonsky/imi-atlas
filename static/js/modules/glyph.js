// @ts-nocheck
// import * as d3 from '../lib/d3.v7.js';

const objectWrapper = document.getElementById('griddy');

export function createGlyphs(data) {
  const overallItems = JSON.parse(sessionStorage.getItem('allItems'));
  // const activeFilters = JSON.parse(sessionStorage.getItem('activeFilters'));
  const overallItemsCategories = Object.keys(overallItems);

  const width = 150,
    height = 150,
    radius = Math.min(width, height) / 2;

  const filterFoldOptions = new Set(JSON.parse(sessionStorage.getItem('foldCategories')));
  const categoryColors = d3.scaleOrdinal().domain(['mediatypes', 'interactions', 'visualizations']).range(['#ff3c00', '#298140', '#2c87b2']);
  const white = '#ffffff';

  // Helper Object
  const translator = {
    mediatypes: 'media_type',
    interactions: 'interaction_type',
    visualizations: 'visualization_type',
  };
  const t = d3.transition().duration(350);

  let id = 0;
  data.forEach((imi) => {
    const gridItem = objectWrapper.querySelector(`.grid-item[filter-id="${imi.id}"]`);

    const outerRingData = [];
    const innerRingData = [];

    // Fill outer and inner ring with data based on accordeon settings
    overallItemsCategories.forEach((category) => {
      if (filterFoldOptions.has(category)) {
        outerRingData.push({ id: id, category, value: overallItems[category].length });
        id = id + 1;
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

    // Draw inner pie chart
    function arcTween(d) {
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(1);
      return (t) => innerArc(interpolate(t));
    }

    function arcTweenExit(d) {
      const endAngle = d.startAngle; // Collapse the arc to a point
      const interpolate = d3.interpolate(this._current, { ...d, endAngle });
      return (t) => innerArc(interpolate(t));
    }

    const t = d3.transition().duration(500);

    // Draw inner pie chart
    svg
      .selectAll('path.inner')
      .data(pie(innerRingData), (d) => `${d.data.category}-${d.data.item}`) // Use 'item' as the key
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('class', 'inner')
            .attr('d', innerArc)
            .attr('fill', (d) => d.data.color)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 2)
            .each(function (d) {
              this._current = d;
            })
            .style('opacity', 0)
            .transition(t)
            .style('opacity', 1)
            .call((enter) => enter.transition(t).attrTween('d', arcTween)),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .attrTween('d', arcTween)
              .attr('fill', (d) => d.data.color)
          ),
        (exit) => exit.call((exit) => exit.transition(t).attrTween('d', arcTweenExit).remove())
      );

    // Draw outer donut chart
    svg
      .selectAll('path.outer')
      .data(pie(outerRingData), (d) => d.data.id)
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('class', 'outer')
            .attr('d', outerArc)
            .attr('fill', (d) => categoryColors(d.data.category))
            .attr('stroke', white)
            .attr('stroke-width', 2)
            .each(function (d) {
              // Save the initial angles for transition
              this._current = { startAngle: 0, endAngle: 0 };
            })
            .style('opacity', 0) // Start with opacity 0
            .transition(t) // Transition to full opacity and animate arc
            .style('opacity', 1)
            .attrTween('d', function (d) {
              const interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(1); // Update _current to the final state
              return function (t) {
                return outerArc(interpolate(t));
              };
            }),
        (update) =>
          update
            .transition(t) // Smoothly update the arc and color
            .attrTween('d', function (d) {
              const interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(1); // Update _current to the final state
              return function (t) {
                return outerArc(interpolate(t));
              };
            })
            .attr('fill', (d) => categoryColors(d.data.category)),
        (exit) =>
          exit
            .transition(t) // Transition out with fade
            .style('opacity', 0)
            .remove()
      );

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

export function updateGlyphs(data) {
  const overallItems = JSON.parse(sessionStorage.getItem('allItems'));
  // const activeFilters = JSON.parse(sessionStorage.getItem('activeFilters'));
  const overallItemsCategories = Object.keys(overallItems);

  const width = 150,
    height = 150,
    radius = Math.min(width, height) / 2;

  const filterFoldOptions = new Set(JSON.parse(sessionStorage.getItem('foldCategories')));
  const categoryColors = d3.scaleOrdinal().domain(['mediatypes', 'interactions', 'visualizations']).range(['#ff3c00', '#298140', '#2c87b2']);
  const white = '#ffffff';

  // Helper Object
  const translator = {
    mediatypes: 'media_type',
    interactions: 'interaction_type',
    visualizations: 'visualization_type',
  };
  let id = 0;

  data.forEach((imi) => {
    const gridItem = objectWrapper.querySelector(`.grid-item[filter-id="${imi.id}"]`);
    // gridItem.classList.add('fade-in');

    const outerRingData = [];
    const innerRingData = [];

    // Fill outer and inner ring with data based on accordeon settings
    overallItemsCategories.forEach((category) => {
      const isFolded = filterFoldOptions.has(category);

      // Add outer ring data
      outerRingData.push({
        id: id,
        category,
        value: isFolded ? overallItems[category].length : 0,
      });

      id = id + 1;

      // Add inner ring data
      innerRingData.push(
        ...overallItems[category].map((item) => ({
          item,
          category,
          value: isFolded ? 1 : 0,
          color: isFolded && imi[translator[category]].includes(item) ? categoryColors(category) : isFolded ? white : 'transparent',
        }))
      );
    });

    // Create the pie and arc functions
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // For the inner pie chart
    const innerArc = d3.arc().innerRadius(25).outerRadius(radius).context(null);

    // For the outer donut chart
    const outerArc = d3
      .arc()
      .innerRadius(radius - 5)
      .outerRadius(radius);

    // Create the SVG container
    // const svg = d3.select(gridItem).select('svg');
    // if (svg.empty()) {
    //   d3.select(gridItem)
    //     .append('svg')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .append('g')
    //     .attr('transform', `translate(${width / 2}, ${height / 2})`);
    // } else {
    // }

    const container = d3.select(gridItem).select('svg').select('g');

    function arcTween(d) {
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(1);
      return (t) => innerArc(interpolate(t));
    }

    function arcTweenExit(d) {
      const endAngle = d.startAngle; // Collapse the arc to a point
      const interpolate = d3.interpolate(this._current, { ...d, endAngle });
      return (t) => innerArc(interpolate(t));
    }

    const t = d3.transition().duration(500);

    // Draw inner pie chart
    container
      .selectAll('path.inner')
      .data(pie(innerRingData), (d) => `${d.data.category}-${d.data.item}`) // Use 'item' as the key
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('class', 'inner')
            .attr('d', innerArc)
            .attr('fill', (d) => d.data.color)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 2)
            .each(function (d) {
              this._current = d;
            })
            .call((enter) => enter.transition(t).attrTween('d', arcTween)),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .attrTween('d', arcTween)
              .attr('fill', (d) => d.data.color)
          ),
        (exit) => exit.call((exit) => exit.transition(t).attrTween('d', arcTweenExit).remove())
      );

    // Draw outer donut chart
    container
      .selectAll('path.outer')
      .data(pie(outerRingData), (d) => d.data.id)
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('class', 'outer')
            .attr('d', outerArc)
            .attr('fill', (d) => categoryColors(d.data.category))
            .attr('stroke', white)
            .attr('stroke-width', 2)
            .each(function (d) {
              // Save the initial angles for transition
              this._current = { startAngle: 0, endAngle: 0 };
            })
            .style('opacity', 0) // Start with opacity 0
            .transition(t) // Transition to full opacity and animate arc
            .style('opacity', 1)
            .attrTween('d', function (d) {
              const interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(1); // Update _current to the final state
              return function (t) {
                return outerArc(interpolate(t));
              };
            }),
        (update) =>
          update
            .transition(t) // Smoothly update the arc and color
            .attrTween('d', function (d) {
              const interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(1); // Update _current to the final state
              return function (t) {
                return outerArc(interpolate(t));
              };
            })
            .attr('fill', (d) => categoryColors(d.data.category)),
        (exit) =>
          exit
            .transition(t) // Transition out with fade
            .style('opacity', 0)
            .remove()
      );

    setTimeout(() => {
      gridItem.classList.add('show');
    }, 5);
  });
}
