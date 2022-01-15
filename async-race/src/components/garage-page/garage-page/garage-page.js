import './garage-page.css';

import React from "react";

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../create-car/create-car';
import UpdateCar from '../update-car/update-car';
import CarTable from '../cars-table/cars-table';


const GaragePage = ({ cars, onCarDeleted,
  onCarAdded, onCountUpdated }) => (
  <div className="garage-page">
    <CarsCounter onCountUpdated={onCountUpdated} />
    <CreateCar onCarAdded={onCarAdded} />
    <UpdateCar />
    <CarTable
      cars={cars}
      onCarDeleted={onCarDeleted} />
  </div>
);

export default GaragePage;
