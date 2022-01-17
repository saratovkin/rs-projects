import './cars-table.css';

import React from "react";

import CarItem from '../car-item/car-item';

const CarTable = ({ cars, onCarDeleted, onCarSelected }) => (
  <div className="cars-table">
    <CarItem
      cars={cars}
      onCarDeleted={onCarDeleted}
      onCarSelected={onCarSelected} />
  </div>
);

export default CarTable;
