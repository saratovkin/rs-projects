import './winner-alert.css';
import React from 'react';

class WinnerAlert extends React.Component {
  render() {
    const winner = this.props.winner;
    return (
      <div className="winner-alert">
        <span>{`Winner is ${winner.name}!`}</span>
        <span>{`Time is ${winner.time}s`}</span>
      </div>
    );
  }
}

export default WinnerAlert;