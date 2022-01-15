import React from "react";
import './cars-counter.css';

class CarsCounter extends React.Component {

  render() {
    return (
      <div className="cars-counter">
        <span>Garage</span>
        <span>({this.props.onCountUpdated()})</span>
      </div>
    );
  }
}

export default CarsCounter;