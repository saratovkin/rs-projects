import React from "react";

import NavBtn from "./nav-btn";

class Navigation extends React.Component {
  render() {
    return (
      <div className="page-navigation">
        <NavBtn name='garage' />
        <NavBtn name='winners' />
      </div>
    );
  }
}

export default Navigation;
