import React from 'react';
import './car-container.css';

import CarItem from '../car-item/car-item';

class CarContainer extends React.Component {
  render() {
    const {
      cars, onCarDeleted, onCarUpdated, onCarSelected, onCarFinished, isRaceStarted, isRaceReset,
    } = this.props;
    const carElements = cars.map((item) => {
      const { id } = item;
      return (
        <CarItem
          {...item}
          key={id}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          onCarSelected={onCarSelected}
          onCarDeleted={() => onCarDeleted(id)}
          onCarUpdated={() => onCarUpdated()}
          onCarFinished={onCarFinished}
        />
      );
    });
    return carElements;
  }
}

export default CarContainer;
