import React from "react";

import CarSpecs from "../car-specs/car-specs";

const CarItem = ({ cars, onCarDeleted }) => {
  const carElements = cars.map((item) => {
    const { id, ...itemProps } = item;
    return <CarSpecs {...itemProps} key={id} onCarDeleted={() => onCarDeleted(id)} />
  });
  return carElements;
};

export default CarItem;