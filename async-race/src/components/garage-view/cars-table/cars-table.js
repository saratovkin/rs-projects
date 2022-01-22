import './cars-table.css';

import React from 'react';

import CarContainer from '../car-container/car-container';

class CarsTable extends React.Component {
  render() {
    const {
      cars, onCarDeleted, onCarSelected, isRaceStarted, isRaceReset, onCarFinished,
    } = this.props;
    return (
      <div className="cars-table">
        <CarContainer
          cars={cars}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
        />
      </div>
    );
  }
}

export default CarsTable;
