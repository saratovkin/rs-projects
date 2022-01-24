import './cars-table.css';

import React from 'react';

import CarContainer from '../car-container/car-container';

class CarsTable extends React.Component {
  render() {
    const {
      cars, onCarDeleted, onCarSelected, isRaceStarted, isRaceReset, onCarFinished, onCarReset, isWinnerSaved, raceId
    } = this.props;
    return (
      <div className="cars-table">
        <CarContainer
          cars={cars}
          raceId={raceId}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          onCarReset={onCarReset}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
        />
      </div>
    );
  }
}

export default CarsTable;
