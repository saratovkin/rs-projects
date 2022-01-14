import React from 'react';

import './header.css';

import Navigation from './navigation';

const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="page-title">
        <div className="page-icon"></div>
        <h1 className="page-name">Async Race</h1>
      </div>
      <Navigation />
    </div>
  </header>
);

export default Header;
