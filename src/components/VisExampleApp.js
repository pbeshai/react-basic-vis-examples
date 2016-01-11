import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import VisExample1 from './VisExample1';
import VisExample2 from './VisExample2';
import VisExample3 from './VisExample3';
import VisExample4 from './VisExample4';
import VisExample5 from './VisExample5';
import VisExample6 from './VisExample6';
import VisExample7 from './VisExample7';
import VisExample8 from './VisExample8';

// CSS via webpack
require('normalize.css');
require('../styles/main.css');

const VisExampleApp = React.createClass({
  getInitialState() {
    // make up some data
    const data = [];
    const numRows = 30;
    const numCols = 50;
    const freqRng = d3.random.normal(15, 15);
    const accRng = d3.random.normal(0.45, 0.1);
    const rankRng = () => Math.ceil(Math.random() * 300);

    for (let x = 0; x < numCols; x++) {
      for (let y = 0; y < numRows; y++) {
        const freq = freqRng();
        data.push({ locationX: x, locationY: y, frequency: freq < 0 ? 0 : freq, accuracy: accRng(), rank: rankRng() });
      }
    }

    return {
      data: data
    };
  },

  // render the line chart and radial heatmap
  render() {
    const { data } = this.state;

    return (
      <div className='main'>
        <div className='example'>
          <h4>Example 1 - Basic SVG Drawing</h4>
          <VisExample1 width={400} height={200} />
        </div>
        <div className='example'>
          <h4>Example 2 - SVG Drawing from Data Array</h4>
          <VisExample2 width={400} height={200} />
        </div>
        <div className='example'>
          <h4>Example 3 - External Data Points</h4>
          <VisExample3 width={400} height={200} data={data} />
        </div>
        <div className='example'>
          <h4>Example 4 - D3 Scales</h4>
          <VisExample4 width={400} height={200} data={data} />
        </div>
        <div className='example'>
          <h4>Example 5 - Inner Margin</h4>
          <VisExample5 width={400} height={200} data={data} />
        </div>
        <div className='example'>
          <h4>Example 6 - Highlight Behaviour (flickers)</h4>
          <VisExample6 width={400} height={200} data={data} />
        </div>
        <div className='example'>
          <h4>Example 7 - Highlight Behaviour (slow)</h4>
          <VisExample7 width={400} height={200} data={data} />
        </div>
        <div className='example'>
          <h4>Example 8 - Highlight Behaviour (optimized)</h4>
          <VisExample8 width={400} height={200} data={data} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<VisExampleApp />, document.getElementById('content'));

export default VisExampleApp;
