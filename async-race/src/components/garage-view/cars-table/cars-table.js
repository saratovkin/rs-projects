import './cars-table.css';

import React from "react";

import CarContainer from '../car-container/car-container';

const CarTable = ({ cars, onCarDeleted, onCarSelected,isRaceStarted }) => (
  <div className="cars-table">
    <CarContainer
      cars={cars}
      onCarDeleted={onCarDeleted}
      onCarSelected={onCarSelected}
      isRaceStarted={isRaceStarted} />
  </div>
);

export default CarTable;
