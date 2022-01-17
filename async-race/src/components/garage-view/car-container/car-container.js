import React from "react";

import CarItem from "../car-item/car-item";

const CarContainer = ({ cars, onCarDeleted, onCarUpdated, onCarSelected }) => {
  const carElements = cars.map((item) => {
    const id = item.id;
    return <CarItem {...item}
      key={id}
      onCarSelected={onCarSelected}
      onCarDeleted={() => onCarDeleted(id)}
      onCarUpdated={() => onCarUpdated()} />
  });
  return carElements;
};

export default CarContainer;