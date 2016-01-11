import React from 'react';

const VisExample3 = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  _chartComponents() {
    /* data is of format:
       data = [{ locationX, locationY, frequency, accuracy, rank }, ...] */
    const { data } = this.props;

    // convert data points into chart points
    const points = data.map(d => {
      return {
        x: d.locationX * 10,
        y: d.locationY * 10,
        r: d.frequency / 5,
        color: d.accuracy > 0.5 ? 'red' : 'blue',
        datum: d
      };
    });

    return {
      points
    };
  },

  render() {
    const { width, height } = this.props;
    const { points } = this._chartComponents();

    return (
      <svg width={width} height={height} className='chart'>
        {points.map((d, i) => {
          return <circle key={i} cx={d.x} cy={d.y}
                         r={d.r} fill={d.color} />;
        })}
      </svg>
    );
  }
});

export default VisExample3;
