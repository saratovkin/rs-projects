import React from 'react';
import './winners-counter.css';

class WinnersCounter extends React.Component {
  render() {
    return (
      <div className="winners-counter">
        <span>Winners</span>
        <span>
          (
          {this.props.count}
          )
        </span>
      </div>
    );
  }
}

export default WinnersCounter;
