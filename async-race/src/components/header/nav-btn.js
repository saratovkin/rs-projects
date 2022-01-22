import React from 'react';

class NavBtn extends React.Component {
  render() {
    return (
      <span
        role="button"
        tabIndex={0}
        className={this.props.className}
        onClick={() => this.props.changeView(this.props.view)}
        onKeyDown={() => this.props.changeView(this.props.view)}
      >
        {this.props.view}
      </span>
    );
  }
}

export default NavBtn;
