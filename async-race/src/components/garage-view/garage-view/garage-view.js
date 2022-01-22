import './garage-view.css';
import React from 'react';

import CarsCounter from '../cars-counter/cars-counter';
import CreateCar from '../car-forms/create-car';
import UpdateCar from '../car-forms/update-car';
import GarageControls from '../garage-controls/garage-controls';
import CarsTable from '../cars-table/cars-table';
import WinnerAlert from '../winner-alert/winner-alert';
import PageNumber from '../../page-number/page-number';
import Pagination from '../../pagination/pagination';

const elementsPerPage = 7;

class GarageView extends React.Component {

  getDisplayedCars() {
    const idx = this.props.page * elementsPerPage;
    const carsOnPage = this.props.cars.slice(idx, idx + elementsPerPage);
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.cars.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.props.onPageChanged('garage', pageNum);
  }

  render() {
    const { page,
      onCarsGenerated, winner,
      onCarDeleted, onCarAdded,
      onCarUpdated, onCarFinished,
      onCarSelected, onCountUpdated,
      onRaceStart, onRaceReset,
      isRaceStarted, isRaceReset,
    } = this.props;

    const alert = winner ? <WinnerAlert winner={winner} /> : null;

    return (
      <div className="garage-view">
        {alert}
        <CarsCounter onCountUpdated={onCountUpdated} />
        <PageNumber pageNum={page} />
        <CreateCar onCarAdded={onCarAdded} />
        <UpdateCar onCarUpdated={onCarUpdated} />
        <GarageControls
          onRaceStart={onRaceStart}
          onRaceReset={onRaceReset}
          onCarsGenerated={onCarsGenerated}
        />
        <CarsTable
          cars={this.getDisplayedCars()}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
        />
        <Pagination
          pagesAmount={this.getAmountOfPages()}
          onPageChanged={this.setPage}
          onRaceReset={onRaceReset}
          pageNum={page}
        />
      </div>
    );
  }
}

export default GarageView;
