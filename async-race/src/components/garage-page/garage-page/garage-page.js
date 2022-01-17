import './garage-page.css';

import React from "react";

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../create-car/create-car';
import UpdateCar from '../update-car/update-car';
import GarageControls from '../garage-controls/garage-controls';
import CarTable from '../cars-table/cars-table';
import CarsPagination from '../cars-pagination/cars-pagination';


class GaragePage extends React.Component {

  state = {
    carPage: 1,
  }

  getDisplayedCars() {
    const page = this.state.carPage;
    const carsOnPage = this.props.cars.slice(page, page + 7);
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.floor(this.props.cars.length / 7);
  }

  render() {
    const { onCarDeleted,
      onCarAdded, onCarUpdated,
      onCountUpdated, onCarsGenerated, onCarSelected } = this.props;
    return (
      <div className="garage-page">
        <CarsCounter onCountUpdated={onCountUpdated} />
        <CreateCar onCarAdded={onCarAdded} />
        <UpdateCar onCarUpdated={onCarUpdated} />
        <GarageControls onCarsGenerated={onCarsGenerated} />
        <CarTable
          cars={this.getDisplayedCars()}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected} />
        <CarsPagination pagesAmount={this.getAmountOfPages()} />
      </div>
    );
  }
}

export default GaragePage;
