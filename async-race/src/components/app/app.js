import './app.css';

import React from "react";

import Header from '../header/header';
import GaragePage from '../garage-page/garage-page/garage-page'
import Footer from '../footer/footer';

import CarGenerator from '../../misc/carGenerator';
import Loader from '../../loader/loader';

class App extends React.Component {

  loader = new Loader();

  state = {
    cars: [],
    page: 'garage',
    currentCar: null,
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

  changePage = (page) => {
    this.setState((prev) => {
      let newState = { ...prev };
      newState.page = page;
      return newState;
    });
  };

  currentPage = () => {
    return this.state.page === 'garage';
  };

  render() {
    return (
      <div className="root-page" >
        <Header page={this.state.page}
          changePage={this.changePage} />
        {this.currentPage() ? <GaragePage
          cars={this.state.cars}
          onCarDeleted={this.deleteCar}
          onCarAdded={this.addCar}
          onCarUpdated={this.updateCar}
          onCountUpdated={this.updateCount}
          onCarsGenerated={this.generateCars}
          onCarSelected={this.selectCar} /> : <p>Winners page</p>}
        <Footer />
      </div>
    )
  };
};

export default App;
