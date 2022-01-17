import React from "react";

class NavBtn extends React.Component {

  render() {
    return (
      <span
        className={this.props.className}
        onClick={() => this.props.changeView(this.props.view)}>
        {this.props.view}
      </span>
    );
  }
}

export default NavBtn;
