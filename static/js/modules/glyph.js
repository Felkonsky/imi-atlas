// @ts-nocheck
// import * as d3 from '../lib/d3.v7.js';

const objectWrapper = document.getElementById('griddy');

// Helper Object
const translator = {
  mediatypes: 'media_type',
  interactions: 'interaction_type',
  visualizations: 'visualization_type',
};

const filterHighlighting = {
  mediatypes: '#FDE0D7',
  interactions: '#D9ECD6',
  visualizations: '#C8EBFB',
};

const width = 150,
  height = 150,
  radius = Math.min(width, height) / 2;

const white = '#ffffff';

// CREATING GLYPHS
export function createGlyphs(data, updateMode = null) {
  d3.select('body').append('div').attr('id', 'd3tooltip').attr('style', 'position: absolute; opacity: 0');

  const overallItems = JSON.parse(sessionStorage.getItem('allItems'));
  const overallItemsCategories = Object.keys(overallItems);
  const activeFilters = JSON.parse(sessionStorage.getItem('activeFilters'));
  const filterFoldOptions = new Set(JSON.parse(sessionStorage.getItem('foldCategories')));

  const updateActiveFilters = (donutData) => {
    donutData.forEach((element) => {
      if (filterFoldOptions.has(element['category'])) {
        const activeFiltersCategoryObject = activeFilters[translator[element['category']]];
        if (activeFiltersCategoryObject) {
          for (const [filterItem, state] of Object.entries(activeFiltersCategoryObject)) {
            if (state === 'checked' && element['item'] === filterItem) {
              element['isHighlighted'] = true;
              element['color'] = filterHighlighting[element['category']];
            }
          }
        }
      }
    });
  };

  const categoryColors = d3.scaleOrdinal().domain(['mediatypes', 'interactions', 'visualizations']).range(['#ff3c00', '#298140', '#2c87b2']);

  const t = d3.transition().duration(350);

  let id = 0;

  data.forEach((imi) => {
    const gridItem = objectWrapper.querySelector(`.grid-item[filter-id="${imi.id}"]`);

    if (gridItem) {
      gridItem.classList.add('fade-in');
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
            isHighlighted: false,
          }))
        );
      });

      if (activeFilters) {
        updateActiveFilters(innerRingData);
      }
      // Create the pie and arc functions
      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null);

      const radiusOffset = 10; // Adjust this value for how much larger you want selected slices to be

      const innerArc = d3
        .arc()
        .innerRadius((d) => (d.data.isHighlighted ? 25 + radiusOffset : 25))
        .outerRadius((d) => (d.data.isHighlighted ? radius * 0.85 + radiusOffset : radius * 0.85));

      // For the outer donut chart
      const outerArc = d3
        .arc()
        .innerRadius(radius * 0.85 - 5)
        .outerRadius(radius * 0.85);

      let svg;

      if (updateMode) {
        svg = d3.select(gridItem).select('svg').select('g');
      } else {
        // Create the SVG container
        svg = d3
          .select(gridItem)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
      }

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

      function calculateOffset(d) {
        const offset = d.data.selected ? 7 : 0; // Adjust '10' for desired offset distance
        const angle = (d.startAngle + d.endAngle) / 2;
        const xOffset = Math.sin(angle) * offset;
        const yOffset = -Math.cos(angle) * offset;
        return `translate(${xOffset}, ${yOffset})`;
      }

      const t = d3.transition().duration(500);
      // Draw inner pie chart
      svg
        .selectAll('path.inner')
        .data(pie(innerRingData), (d) => (d.data ? `${d.data.category}-${d.data.item}` : null)) // Use 'item' as the key
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
              .call((enter) => enter.transition(t).attrTween('d', arcTween))
              .attr('transform', calculateOffset)
              .on('mouseover', function (event, d) {
                if (d.data.color !== '#ffffff') {
                  d3.select('#d3tooltip').style('opacity', 1).text(d.data.item);
                }
              })
              .on('mouseout', () => {
                d3.select('#d3tooltip').style('opacity', 0);
              })
              .on('mousemove', (event) => {
                d3.select('#d3tooltip')
                  .style('left', event.pageX + 10 + 'px')
                  .style('top', event.pageY + 10 + 'px');
              }),
          (update) =>
            update.call((update) =>
              update
                .transition(t)
                .attrTween('d', arcTween)
                .attr('fill', (d) => d.data.color)
                .attr('transform', calculateOffset)
                .on('mouseover', function (event, d) {
                  if (d.data.color !== '#ffffff') {
                    d3.select('#d3tooltip').transition().duration(200).style('opacity', 1).text(d.data.item);
                  }
                })
                .on('mouseleave', () => {
                  d3.select('#d3tooltip').style('opacity', 0);
                })
                .on('mousemove', function (event) {
                  d3.select('#d3tooltip')
                    .style('left', event.pageX + 10 + 'px')
                    .style('top', event.pageY + 10 + 'px');
                })
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
              .style('opacity', 0)
              .transition(t)
              .style('opacity', 1)
              .attrTween('d', function (d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(1);
                return function (t) {
                  return outerArc(interpolate(t));
                };
              }),
          (update) =>
            update
              .transition(t)
              .attrTween('d', function (d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(1);
                return function (t) {
                  return outerArc(interpolate(t));
                };
              })
              .attr('fill', (d) => categoryColors(d.data.category)),
          (exit) => exit.transition(t).style('opacity', 0).remove()
        );

      setTimeout(() => {
        gridItem.classList.add('show');
      }, 5);

      const svgs = d3.selectAll('svg');
      d3.select('body').on('mousemove', function (event) {
        const isInsideAnySVG = Array.from(document.querySelectorAll('svg')).some((svg) => {
          const rect = svg.getBoundingClientRect();
          return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        });

        if (!isInsideAnySVG) {
          d3.selectAll('.d3tooltip').style('opacity', 0);
        }
      });
    }
  });
}
