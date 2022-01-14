import './garage-page.css';

import React from "react";

import CreateCar from "./create-car";
import UpdateCar from "./update-car";
import CarTable from "./cars/car-table";

const GaragePage = ({ cars }) => (
  <div className="garage-page">
    <CreateCar />
    <UpdateCar />
    <CarTable cars={cars} />
  </div>
);

export default GaragePage;