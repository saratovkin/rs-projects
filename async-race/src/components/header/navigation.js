import React from "react";

import NavBtn from "./nav-btn";

class Navigation extends React.Component {

  views = ['garage', 'winners'];

  render() {
    const navBtns = this.views.map((view) => {
      const isActive = this.props.view === view;
      const className = isActive ? 'nav-button active' : 'nav-button';
      return (
        <NavBtn view={view}
          className={className}
          changeView={this.props.changeView}
          key={view} />
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
