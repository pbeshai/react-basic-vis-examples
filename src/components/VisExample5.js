import React from 'react';
import d3 from 'd3';

const VisExample5 = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  _chartComponents() {
    /* data is of format:
       data = [{ locationX, locationY, frequency, accuracy, rank }, ...] */
    const { width, height, data } = this.props;

    // convert data points into chart points
    const points = data.map(d => {
      return {
        x: d.locationX,
        y: d.locationY,
        r: d.frequency,
        color: d.accuracy,
        datum: d
      };
    });

    // define the inner margins of the chart
    const innerMargin = { top: 10, bottom: 25, left: 10, right: 10 };
    const innerWidth = width - innerMargin.left - innerMargin.right;
    const innerHeight = height - innerMargin.top - innerMargin.bottom;

    // get the range of values from the x and y attributes in the data
    const xDomain = d3.extent(points, d => d.x);
    const yDomain = d3.extent(points, d => d.y);

    // use d3 to create scales based on the dimensions and domains
    const x = d3.scale.linear().domain(xDomain)
      .range([innerMargin.left, innerMargin.left + innerWidth]);

    const y = d3.scale.linear().domain(yDomain)
      .range([innerMargin.top, innerMargin.top + innerHeight]);

    // create radius scale based on data
    const rDomain = d3.extent(points, d => d.r);
    const numCols = xDomain[1];
    const r = d3.scale.linear().domain(rDomain)
      .range([0, innerWidth / numCols]);

    // create color scale (colors from http://colorbrewer2.org)
    const color = d3.scale.linear().domain([0.3, 0.45, 0.6])
      .range(['#0571b0', '#f7f7f7', '#ca0020']).clamp(true);

    return {
      points,
      width,
      height,
      innerMargin,
      x,
      y,
      r,
      color
    };
  },

  render() {
    const { points, width, height, x, y, r, color } = this._chartComponents();

    return (
      <svg width={width} height={height} className='chart'>
        {points.map((d, i) => {
          return <circle key={i} cx={x(d.x)} cy={y(d.y)}
                         r={r(d.r)} fill={color(d.color)} />;
        })}
      </svg>
    );
  }
});

export default VisExample5;
