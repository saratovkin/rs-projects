import './garage-view.css';
import React from "react";

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../car-forms/create-car';
import UpdateCar from '../car-forms/update-car';
import GarageControls from '../garage-controls/garage-controls';
import CarsTable from '../cars-table/cars-table';
import CarsPagination from '../cars-pagination/cars-pagination';
import PageNumber from '../page-number/page-number';
import WinnerAlert from '../winner-alert/winner-alert';

const elementsPerPage = 7;

class GarageView extends React.Component {

  state = {
    pageNum: 0,
  }

  getDisplayedCars() {
    const idx = this.state.pageNum * elementsPerPage;
    const carsOnPage = this.props.cars.slice(idx, idx + elementsPerPage);
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.cars.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.setState(() => {
      return { pageNum: pageNum };
    });
  }

  render() {
    const { onCarsGenerated, winner,
      onCarDeleted, onCarAdded,
      onCarUpdated, onCarFinished,
      onCarSelected, onCountUpdated,
      onRaceStart, onRaceReset,
      isRaceStarted, isRaceReset } = this.props;
    const alert = winner ? <WinnerAlert winner={winner} /> : null;
    
    return (
      <div className="garage-view">
        {alert}
        <CarsCounter onCountUpdated={onCountUpdated} />
        <PageNumber pageNum={this.state.pageNum} />
        <CreateCar onCarAdded={onCarAdded} />
        <UpdateCar onCarUpdated={onCarUpdated} />
        <GarageControls
          onRaceStart={onRaceStart}
          onRaceReset={onRaceReset}
          onCarsGenerated={onCarsGenerated} />
        <CarsTable
          cars={this.getDisplayedCars()}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset} />
        <CarsPagination
          pagesAmount={this.getAmountOfPages()}
          onPageChange={this.setPage}
          onRaceReset={onRaceReset}
          pageNum={this.state.pageNum} />
      </div>
    );
  }
}

export default GarageView;
