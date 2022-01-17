import React from 'react';

import './header.css';

import Navigation from './navigation';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <div className="page-title">
            <div className="page-icon"></div>
            <h1 className="page-name">Async Race</h1>
          </div>
          <Navigation page={this.props.page}
            changePage={this.props.changePage} />
        </div>
      </header>
    );
  }
}

export default Header;
