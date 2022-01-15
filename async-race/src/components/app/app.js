import './app.css';

import React from "react";

import Header from '../header/header';
import GaragePage from '../garage-page/garage-page/garage-page'
import Footer from '../footer/footer';

class App extends React.Component {

  state = {
    cars: [
      {
        name: 'Volvo XC60',
        color: '#ff0000',
        id: 1,
      },
      {
        name: 'Porsche Macan',
        color: '#00ff00',
        id: 2,
      },
      {
        name: 'Tesla Model Y',
        color: '#0000ff',
        id: 3,
      },
    ]
  }

  deleteCar = (id) => {
    this.setState(({ cars }) => {
      const idx = cars.findIndex((el) => el.id === id);
      return {
        cars: [...cars.slice(0, idx), ...cars.slice(idx + 1)],
      }
    });
  }

  addCar = (name, color) => {
    const newCar = {
      name: 'hyundai',
      color: '#333333',
      id: 9,
    };
    this.setState(({ cars }) => {
      const newArr = [...cars, newCar];
      return { cars: newArr };
    });
  }

  updateCount = () => {
    return this.state.cars.length;
  };

  render() {
    return (
      <div className="root-page" >
        <Header />
        <GaragePage
          cars={this.state.cars}
          onCarDeleted={this.deleteCar}
          onCarAdded={this.addCar}
          onCountUpdated={this.updateCount} />
        <Footer />
      </div>
    )
  };
};

export default App;


// import Loader from '../loader';
// let cars = [];
// function getData(data) {
//   cars = data;
//   console.log(cars);
// }

// Loader.load('GET', 'garage/1', getData);