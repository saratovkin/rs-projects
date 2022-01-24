import './app.css';

import React from 'react';

import Header from '../header/header';
import GarageView from '../garage-view/garage-view/garage-view';
import WinnersView from '../winners-view/winners-view/winners-view';
import Footer from '../footer/footer';

import CarGenerator from '../../misc/carGenerator';
import Loader from '../../loader/loader';

class App extends React.Component {

  constructor() {
    super();
    this.loader = new Loader();
    this.state = {
      cars: [],
      winners: [],
      winner: undefined,
      view: 'garage',
      currentCar: undefined,
      newCarName: '',
      newCarColor: '#000000',
      currentCarName: '',
      currentCarColor: '#000000',
      sortType: 'wins',
      sortDirection: 'Desc',
      garagePage: 0,
      winnersPage: 0,
      raceId: 0,
      isRaceStarted: false,
      isRaceReset: false,
      isWinnerSaved: false,
    };
    this.getCars();
    this.getWinners();
  }

  getCars = () => {
    this.loader.getAllCars().then((data) => {
      this.setState(() => ({ cars: data }));
    });
  };

  addCar = (name, color) => {
    this.loader.createCar(name, color).then((res) => {
      this.setState(({ cars }) => {
        const newArr = [...cars, res];
        return { cars: newArr };
      });
    });
  };

  selectCar = (id) => {
    this.setState(() => ({ currentCar: id }));
  };

  updateCar = (name, color) => {
    if (this.state.currentCar !== undefined) {
      this.loader.updateCar(this.state.currentCar, name, color).then((res) => {
        this.setState(({ cars }) => {
          const idx = cars.findIndex((el) => el.id === res.id);
          return { cars: [...cars.slice(0, idx), res, ...cars.slice(idx + 1)], currentCar: null };
        });
      });
      this.getWinners();
    }
  };

  deleteCar = (id) => {
    this.loader.deleteCar(id).then(() => {
      this.loader.deleteWinner(id).then(() => {
        this.getCars();
        this.getWinners();
      });
    });
  };

  generateCars = () => {
    const generatedCars = CarGenerator.generateCars();
    generatedCars.forEach((item) => {
      this.addCar(item.name, item.color);
    });
  };

  getWinners = () => {
    const winners = [];
    this.loader.getAllWinners().then((data) => {
      data.forEach((winner) => {
        this.loader.getCarById(winner.id).then((res) => {
          winners.push({
            id: res.id,
            name: res.name,
            color: res.color,
            wins: winner.wins,
            time: winner.time,
          });
        });
      });
      this.setState(() => ({
        winners: winners,
      }));
    });
  };

  updateCount = () => this.state.cars.length;

  startRace = () => {
    if (this.state.cars.length !== 0) {
      this.setState(({ raceId }) => {
        const newRaceId = raceId + 1;
        return ({
          raceId: newRaceId,
          isRaceStarted: true,
          isRaceReset: false,
          isWinnerSaved: false,
        });
      });
    }
  };

  resetRace = () => {
    if (!this.state.isRaceReset && this.state.cars.length !== 0) {
      this.setState(({ raceId }) => {
        const newRaceId = raceId + 1;
        return ({
          raceId: newRaceId,
          isRaceStarted: false,
          isRaceReset: true,
          winner: undefined,
        });
      });
    }
  };

  saveWinner = (winner) => {
    if (!this.state.isWinnerSaved) {
      this.setState(() => {
        return {
          isWinnerSaved: true,
          winner: { name: winner.name, time: winner.time },
        }
      });
      this.loader.getWinnerById(winner.id).then((res) => {
        const newWinner = winner;
        if (res) {
          this.loader.updateWinner(
            winner.id,
            res.wins + 1,
            (+res.time > +winner.time) ? winner.time : res.time,
          );
          newWinner.wins = res.wins + 1;
          newWinner.time = (+res.time > +winner.time) ? winner.time : res.time;
          this.setState(({ winners }) => {
            const idx = winners.findIndex((el) => el.id === newWinner.id);
            return ({
              winners: [...winners.slice(0, idx), newWinner, ...winners.slice(idx + 1)]
            })
          });
        } else {
          this.loader.createWinner(winner.id, 1, winner.time);
          newWinner.wins = 1;
          this.setState(({ winners }) => ({
            winners: [...winners, newWinner]
          }));
        }
      });
    }
  };

  setViewPage = (view, page) => {
    this.setState(() => {
      if (view === 'garage') {
        return { garagePage: page };
      }
      return { winnersPage: page };
    });
  };

  changeView = (view) => {
    this.resetRace();
    this.setState((prev) => {
      const newState = { ...prev };
      newState.view = view;
      return newState;
    });
  };

  setSpecs = (key, value) => {
    this.setState({
      [`currentCar${key}`]: value,
    });
  };

  setSortType = (newType) => {
    this.setState(({ sortDirection }) => {
      return { sortType: newType, sortDirection: sortDirection === 'Desc' ? 'Asc' : 'Desc' };
    });
  };

  render() {
    const garageView = (
      <GarageView
        cars={this.state.cars}
        raceId={this.state.raceId}
        winner={this.state.winner}
        page={this.state.garagePage}
        currentName={this.state.currentCarName}
        currentColor={this.state.currentCarColor}
        isRaceStarted={this.state.isRaceStarted}
        isRaceReset={this.state.isRaceReset}
        isWinnerSaved={this.state.isWinnerSaved}
        onSpecsInput={this.setSpecs}
        onPageChanged={this.setViewPage}
        onCarDeleted={this.deleteCar}
        onCarAdded={this.addCar}
        onCarUpdated={this.updateCar}
        onCountUpdated={this.updateCount}
        onCarsGenerated={this.generateCars}
        onCarSelected={this.selectCar}
        onCarFinished={this.saveWinner}
        onRaceStart={this.startRace}
        onRaceReset={this.resetRace}
      />
    );

    const winnersView = (
      <WinnersView
        winners={this.state.winners}
        page={this.state.winnersPage}
        onPageChanged={this.setViewPage}
        onSortTypeSelected={this.setSortType}
        sortType={this.state.sortType}
        sortDirection={this.state.sortDirection}
      />
    );
    const view = this.state.view === 'garage' ? garageView : winnersView;

    return (
      <div className="main-container">
        <Header
          view={this.state.view}
          changeView={this.changeView}
        />
        {view}
        <Footer />
      </div>
    );
  }
}

export default App;
