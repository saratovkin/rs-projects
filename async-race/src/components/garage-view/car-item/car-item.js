import React from "react";

import CarSpecs from "../car-specs/car-specs";

const CarItem = ({ cars, onCarDeleted, onCarUpdated, onCarSelected }) => {
  const carElements = cars.map((item) => {
    const id = item.id;
    return <CarSpecs {...item}
      key={id}
      onCarSelected={onCarSelected}
      onCarDeleted={() => onCarDeleted(id)}
      onCarUpdated={() => onCarUpdated()} />
  });
  return carElements;
};

export default CarItem;