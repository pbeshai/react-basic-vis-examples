import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

const VisExample8Points = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    chartComponents: React.PropTypes.object.isRequired,
    onHighlight: React.PropTypes.func
  },

  _handleHighlight(d) {
    if (this.props.onHighlight) {
      this.props.onHighlight(d);
    }
  },

  render() {
    const { points, x, y, r, color } = this.props.chartComponents;
    const maxRadius = r.range()[1] / 2;

    return (
      <g className='points'>
        {points.map((d, i) => {
          return (
            <g key={i}>
              <circle cx={x(d.x)} cy={y(d.y)}
                      r={r(d.r)} fill={color(d.color)} />
              <rect // the invisible mouse handler
                    x={x(d.x) - maxRadius} y={y(d.y) - maxRadius}
                    width={maxRadius * 2} height={maxRadius * 2}
                    fill={color(d.color)} style={{ opacity: 0 }}
                    onMouseEnter={this._handleHighlight.bind(this, d)}
                    onMouseLeave={this._handleHighlight.bind(this, null)} />
            </g>
          );
        })}
      </g>
    );
  }
});

const VisExample8Highlight = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    chartComponents: React.PropTypes.object.isRequired,
    highlight: React.PropTypes.object
  },

  render() {
    const { highlight, chartComponents } = this.props;
    const { innerMargin, height, x, y, r, color } = chartComponents;

    // no highlight, so don't show anything
    if (!highlight) {
      return null;
    }

    // show a circle around the point and the text details of the point
    return (
      <g className='highlight'>
        <circle cx={x(highlight.x)} cy={y(highlight.y)} r={r(highlight.r) + 4}
                fill={color(highlight.color)} strokeWidth={2}
                stroke={d3.rgb(color(highlight.color)).darker()} />
        <text x={innerMargin.left} y={height - 15}>
          {`Rank #${highlight.datum.rank},
            Frequency ${d3.format('0.1f')(highlight.datum.frequency)},
            Accuracy ${d3.format('0.1%')(highlight.datum.accuracy)}`}
        </text>
      </g>
    );
  }
});


const VisExample8 = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      chartComponents: this._chartComponents()
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      chartComponents: this._chartComponents(nextProps)
    });
  },

  _chartComponents(props = this.props) {
    /* data is of format:
       data = [{ locationX, locationY, frequency, accuracy, rank }, ...] */
    const { width, height, data } = props;

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
      .range([0, (innerWidth / numCols)]);

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

  _handleHighlight(d) {
    this.setState({ highlight: d });
  },

  _renderHighlight() {
    const { highlight, chartComponents } = this.state;

    // no highlight, so don't show anything
    if (!highlight) {
      return null;
    }

    // show a circle around the point and the text details of the point
    return <VisExample8Highlight chartComponents={chartComponents}
              highlight={highlight} />;
  },

  render() {
    const { chartComponents } = this.state;
    const { width, height } = chartComponents;

    return (
      <svg width={width} height={height} className='chart'>
        <VisExample8Points chartComponents={chartComponents}
          onHighlight={this._handleHighlight} />
        {this._renderHighlight()}
      </svg>
    );
  }
});

export default VisExample8;
