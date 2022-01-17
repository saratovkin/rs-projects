import './app.css';

import React from "react";

import Header from '../header/header';
import GarageView from '../garage-view/garage-view/garage-view';
import WinnersView from '../winners-view/winners-view/winners-view';
import Footer from '../footer/footer';

import CarGenerator from '../../misc/carGenerator';
import Loader from '../../loader/loader';

class App extends React.Component {

  loader = new Loader();

  state = {
    cars: [],
    view: 'garage',
    currentCar: null,
    garagePage: 0,
  }

  constructor() {
    super();
    this.getCars();
  }

  getCars() {
    this.loader.getAllCars().then((data) => {
      this.setState(() => {
        return { cars: data };
      });
    })
  }

  addCar = (name, color) => {
    this.loader.createCar(name, color).then((res) => {
      this.setState(({ cars }) => {
        const newArr = [...cars, res];
        return { cars: newArr };
      });
    });
  }

  selectCar = (id) => {
    this.setState(() => {
      return { currentCar: id };
    });
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
  }

  deleteCar = (id) => {
    this.loader.deleteCar(id).then(() => {
      this.getCars();
    });
  }

  generateCars = () => {
    const generatedCars = CarGenerator.generateCars();
    generatedCars.forEach((item) => {
      this.addCar(item.name, item.color);
    })
  }

  updateCount = () => {
    return this.state.cars.length;
  };

  changeView = (view) => {
    this.setState((prev) => {
      let newState = { ...prev };
      newState.view = view;
      return newState;
    });
  };

  currentView = () => {
    return this.state.view === 'garage';
  };

  render() {
    const garageView = <GarageView
      cars={this.state.cars}
      onCarDeleted={this.deleteCar}
      onCarAdded={this.addCar}
      onCarUpdated={this.updateCar}
      onCountUpdated={this.updateCount}
      onCarsGenerated={this.generateCars}
      onCarSelected={this.selectCar} />;
    const winnersView = <WinnersView />
    const view = this.state.view === 'garage' ? garageView : winnersView;
    return (
      <div className="main-container" >
        <Header view={this.state.view}
          changeView={this.changeView} />
        {view}
        <Footer />
      </div>
    )
  };
};

export default App;
