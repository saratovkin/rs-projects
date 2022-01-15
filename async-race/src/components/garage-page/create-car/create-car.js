import React from 'react';

class CreateCar extends React.Component {
  render() {
    return (
      <div className="car-params">
        <input type='text' placeholder='Car Model' />
        <input type='color' />
        {/* get input here */}
        <button onClick={()=>this.props.onCarAdded('123')}>Create</button>
      </div>
    );
  };
}

export default CreateCar;
