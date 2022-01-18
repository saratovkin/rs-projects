import React from "react";
import './car-container.css';

import CarItem from "../car-item/car-item";

class CarContainer extends React.Component {

  render() {
    const { cars, onCarDeleted, onCarUpdated, onCarSelected, isRaceStarted } = this.props;
    const carElements = cars.map((item) => {
      const id = item.id;
      return <CarItem {...item}
        key={id}
        isRaceStarted={isRaceStarted}
        onCarSelected={onCarSelected}
        onCarDeleted={() => onCarDeleted(id)}
        onCarUpdated={() => onCarUpdated()} />
    });
    return carElements;
  }
}

export default CarContainer;