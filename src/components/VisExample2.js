import React from 'react';

const VisExample2 = React.createClass({
  propTypes: {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  render() {
    const { width, height } = this.props;

    const data = [
      { x: 30, y: 80, r: 25, color: 'red' },
      { x: 130, y: 80, r: 60, color: 'green' },
      { x: 260, y: 80, r: 40, color: 'blue' }
    ];

    return (
      <svg width={width} height={height} className='chart'>
        {data.map((d, i) => {
          return <circle key={i} cx={d.x} cy={d.y}
                         r={d.r} fill={d.color} />;
        })}
      </svg>
    );
  }
});

export default VisExample2;
