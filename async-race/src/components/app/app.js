import './app.css';

import React from 'react';

import Header from '../header/header';
import GarageView from '../garage-view/garage-view/garage-view';
import WinnersView from '../winners-view/winners-view/winners-view';
import Footer from '../footer/footer';

import CarGenerator from '../../misc/carGenerator';
import Loader from '../../loader/loader';

const resetDelay = 2000;

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
      garagePage: 0,
      winnersPage: 0,
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
    if (this.state.currentCar !== null) {
      this.loader.updateCar(this.state.currentCar, name, color).then((res) => {
        this.setState(({ cars }) => {
          const idx = cars.findIndex((el) => el.id === res.id);
          return { cars: [...cars.slice(0, idx), res, ...cars.slice(idx + 1)], currentCar: null };
        });
      });
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

  saveWinner = (winner) => {
    if (!this.state.isWinnerSaved) {
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
              isWinnerSaved: true,
              winner: { name: winner.name, time: winner.time },
              winners: [...winners.slice(0, idx), newWinner, ...winners.slice(idx + 1)]
            })
          });
        } else {
          this.loader.createWinner(winner.id, 1, winner.time);
          newWinner.wins = 1;
          this.setState(({ winners }) => ({
            isWinnerSaved: true,
            winner: { name: winner.name, time: winner.time },
            winners: [...winners, newWinner]
          }));
        }
      });
    }
  };

  updateCount = () => this.state.cars.length;

  startRace = () => {
    if (!this.state.isRaceStarted) {
      this.setState(() => ({ isRaceStarted: true, isRaceReset: false }));
    }
    setTimeout(() => {
      this.setState(() => ({ isRaceStarted: false, isRaceReset: false }));
    }, resetDelay);
  };

  resetRace = () => {
    if (!this.state.isRaceReset) {
      this.setState(() => ({
        isRaceStarted: false, isRaceReset: true, winner: undefined, isWinnerSaved: false,
      }));
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
    this.setState((prev) => {
      const newState = { ...prev };
      newState.view = view;
      return newState;
    });
  };

  render() {
    const garageView = (
      <GarageView
        cars={this.state.cars}
        winner={this.state.winner}
        page={this.state.garagePage}
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
        isRaceStarted={this.state.isRaceStarted}
        isRaceReset={this.state.isRaceReset}
      />
    );

    const winnersView = (
      <WinnersView
        winners={this.state.winners}
        page={this.state.winnersPage}
        onPageChanged={this.setViewPage}
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
