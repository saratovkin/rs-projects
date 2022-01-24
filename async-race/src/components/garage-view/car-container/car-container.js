import React from 'react';
import './car-container.css';

import CarItem from '../car-item/car-item';

class CarContainer extends React.Component {
  render() {
    const {
      cars, onCarDeleted, onCarUpdated, onCarSelected, onCarFinished, isRaceStarted, isRaceReset, onCarReset, isWinnerSaved, raceId
    } = this.props;
    const carElements = cars.map((item) => {
      const { id } = item;
      return (
        <CarItem
          {...item}
          key={id}
          raceId={raceId}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
          onCarSelected={onCarSelected}
          onCarDeleted={() => onCarDeleted(id)}
          onCarUpdated={() => onCarUpdated()}
          onCarFinished={onCarFinished}
          onCarReset={onCarReset}
        />
      );
    });
    return carElements;
  }
}

export default CarContainer;
