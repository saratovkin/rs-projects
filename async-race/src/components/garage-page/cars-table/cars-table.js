import './cars-table.css';

import React from "react";

import CarItem from '../car-item/car-item';

const CarTable = ({ cars, onCarDeleted, onCarAdded }) => (
  <ul className="cars-table">
    <CarItem
      cars={cars}
      onCarDeleted={onCarDeleted} />
  </ul>
);

export default CarTable;
