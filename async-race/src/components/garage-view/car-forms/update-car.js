import './car-forms.css';
import React from 'react';

class UpdateCar extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    const name = this.props.currentName;
    const color = this.props.currentColor;
    this.props.onCarUpdated(name, color);
    this.props.onSpecsInput('Name', '');
    this.props.onSpecsInput('Color', '#000000');
  };
  
  render() {
    return (
      <form
        className="car-form"
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          placeholder="Car Model"
          value={this.props.currentName}
          onChange={(e) => this.props.onSpecsInput('Name', e.target.value)}
        />
        <input
          type="color"
          value={this.props.currentColor}
          onChange={(e) =>  this.props.onSpecsInput('Color', e.target.value)}
        />
        <button>Update</button>
      </form>
    );
  }
}

export default UpdateCar;
