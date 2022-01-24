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

  constructor() {
    super();
    this.state = {
      resets: 0,
    }
    this.carsAmount = 0;
  }

  awaitReset = () => {
    this.setState(({ resets }) => {
      const newResets = resets + 1;
      return { resets: newResets };
    });
  };

  clearResets = () => {
    this.setState(() => {
      return { resets: 0 };
    });
  };

  isStartPossible = () => {
    if (this.props.cars.length === 0) {
      return false;
    }
    if (!this.props.isRaceStarted && !this.props.isRaceReset) {
      return true;
    }
    if (this.props.isRaceReset && this.state.resets === this.carsAmount) {
      return true;
    }
    return false;
  }

  getDisplayedCars() {
    const idx = this.props.page * elementsPerPage;
    const carsOnPage = this.props.cars.slice(idx, idx + elementsPerPage);
    this.carsAmount = carsOnPage.length;
    return carsOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.cars.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.props.onPageChanged('garage', pageNum);
  }

  render() {
    if (this.state.isRaceStarted) {
      this.clearResets();
    }
    const { page, currentName,
      currentColor, onSpecsInput,
      onCarsGenerated, winner,
      onCarDeleted, onCarAdded,
      onCarUpdated, onCarFinished,
      onCarSelected, onCountUpdated,
      onRaceStart, onRaceReset,
      isRaceStarted, isRaceReset,
      isWinnerSaved, raceId

    } = this.props;

    const alert = winner ? <WinnerAlert winner={winner} /> : null;

    return (
      <div className="garage-view">
        {alert}
        <CarsCounter onCountUpdated={onCountUpdated} />
        <PageNumber pageNum={page} />
        <CreateCar onCarAdded={onCarAdded} />
        <UpdateCar
          onSpecsInput={onSpecsInput}
          onCarUpdated={onCarUpdated}
          currentName={currentName}
          currentColor={currentColor}
        />
        <GarageControls
          isRaceStarted={isRaceStarted}
          isWinnerSaved={isWinnerSaved}
          onRaceStart={onRaceStart}
          onRaceStart={() => { onRaceStart(); this.clearResets(); }}
          onRaceReset={onRaceReset}
          onCarsGenerated={onCarsGenerated}
          isStartPossible={this.isStartPossible()}
        />
        <CarsTable
          cars={this.getDisplayedCars()}
          raceId={raceId}
          onCarDeleted={onCarDeleted}
          onCarSelected={onCarSelected}
          onCarFinished={onCarFinished}
          onCarReset={this.awaitReset}
          isRaceStarted={isRaceStarted}
          isRaceReset={isRaceReset}
          isWinnerSaved={isWinnerSaved}
        />
        <Pagination
          pagesAmount={this.getAmountOfPages()}
          onPageChanged={this.setPage}
          onRaceReset={onRaceReset}
          isRaceStarted={isRaceStarted}
          isWinnerSaved={isWinnerSaved}
          pageNum={page}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.cars.length !== prevProps.cars.length) {
      this.setState(() => {
        return { resets: this.carsAmount };
      });
    }
  }
}

export default GarageView;
