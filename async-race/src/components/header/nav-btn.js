import React from "react";

class NavBtn extends React.Component {

  render() {
    return (
      <span
        className={this.props.className}
        onClick={() => this.props.changePage(this.props.name)}>
        {this.props.name}
      </span>
    );
  }
}

export default NavBtn;
