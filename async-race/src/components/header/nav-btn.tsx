import React from 'react';

interface State {

}

interface Props {
  changeView: (view: string) => void,
  view: string,
  className: string,
}

class NavBtn extends React.Component<Props, State> {
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
