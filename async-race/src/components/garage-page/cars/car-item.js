import React from "react";

import CarInfo from "./car-info";

const CarItem = ({ cars }) => {
  const carElements = cars.map((item) => {
    const { id, ...itemProps } = item;
    return <CarInfo {...itemProps} key={id} />
  });

  return carElements;
};

export default CarItem;