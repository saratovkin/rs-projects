import React from 'react';

class CreateCar extends React.Component {

  state = {
    name: '',
    color: '#000000',
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, color } = this.state;
    this.props.onCarAdded(name, color);
    this.setState({
      name: '',
      color: '#000000',
    });
  };

  onInput = (key, e) => {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    return (
      <form className="car-params"
        onSubmit={this.onSubmit}>
        <input type='text'
          placeholder='Car Model'
          value={this.state.name}
          onChange={(e) => this.onInput('name', e)} />
        <input type='color'
          value={this.state.color}
          onChange={(e) => this.onInput('color', e)} />
        <button>Create</button>
      </form>
    );
  };
}

export default CreateCar;
