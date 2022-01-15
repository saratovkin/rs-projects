import React from "react";

class NavBtn extends React.Component {

  state = {
    active: false,
  };

  onNavClick = () => {
    this.setState(({active}) => {
      return {
        active: !active,
      };
    });
  };

  render() {
    const { active } = this.state;
    let className = 'nav-button';
    if (active) {
      className += ' active';
    }
    return (
      <span
        className={className}
        onClick={this.onNavClick}
      >
        {this.props.name}
      </span>
    );
  }
}

export default NavBtn;
