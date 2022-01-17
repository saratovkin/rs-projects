import React from "react";

import NavBtn from "./nav-btn";

class Navigation extends React.Component {

  pages = ['garage', 'winners'];

  render() {
    const navBtns = this.pages.map((name) => {
      const isActive = this.props.page === name;
      const className = isActive ? 'nav-button active' : 'nav-button';
      return (
        <NavBtn name={name}
          className={className}
          changePage={this.props.changePage}
          key={name} />
      )
    });
    return (
      <div className="page-navigation">
        {navBtns}
      </div>
    );
  }
}

export default Navigation;
