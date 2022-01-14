import './cars-table.css';

import React from "react";

import CarItem from "./car-item";

const CarTable = ({ cars }) => (
  <ul className="cars-table">
    <CarItem cars={cars} />
  </ul>
);

export default CarTable;
