import './cars-table.css';

import React from "react";

import CarContainer from '../car-container/car-container';

const CarTable = ({ cars, onCarDeleted, onCarSelected }) => (
  <div className="cars-table">
    <CarContainer
      cars={cars}
      onCarDeleted={onCarDeleted}
      onCarSelected={onCarSelected} />
  </div>
);

export default CarTable;
