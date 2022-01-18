import './garage-view.css';
import React from "react";

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../car-forms/create-car';
import UpdateCar from '../car-forms/update-car';
import GarageControls from '../garage-controls/garage-controls';
import CarTable from '../cars-table/cars-table';
import CarsPagination from '../cars-pagination/cars-pagination';
import PageNumber from '../page-number/page-number';

class GarageView extends React.Component {

  state = {
    pageNum: 0,
  }

  getDisplayedCars() {
    const idx = this.state.pageNum * 7;
    const carsOnPage = this.props.cars.slice(idx, idx + 7);
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.cars.length / 7);
  }

  setPage = (pageNum) => {
    this.setState(() => {
      return { pageNum: pageNum };
    })
  }

  render() {
    const { onCarDeleted,
      onCarAdded, onCarUpdated,
      onCountUpdated, onCarsGenerated,
      onCarSelected, onRaceToggle, isRaceStarted } = this.props;
    return (
      <div className="garage-view">
        <CarsCounter onCountUpdated={onCountUpdated} />
        <PageNumber pageNum={this.state.pageNum} />
        <CreateCar onCarAdded={onCarAdded} />
        <UpdateCar onCarUpdated={onCarUpdated} />
        <GarageControls
          onRaceToggle={onRaceToggle}
          onCarsGenerated={onCarsGenerated} />
        <CarTable
          cars={this.getDisplayedCars()}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          isRaceStarted={isRaceStarted} />
        <CarsPagination
          pagesAmount={this.getAmountOfPages()}
          onPageChange={this.setPage}
          pageNum={this.state.pageNum} />
      </div>
    );
  }
}

export default GarageView;
