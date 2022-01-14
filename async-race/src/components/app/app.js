import './main.css';

import React from "react";

import Header from '../header/header';
import GaragePage from "../garage-page/garage-page";
import Footer from '../footer/footer';

const App = () => {
  const carsData = [
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
  ];
  return (
    <div className="root-page">
      <Header />
      <GaragePage cars={carsData} />
      <Footer />
    </div>
  )
};

export default App;