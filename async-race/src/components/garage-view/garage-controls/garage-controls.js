import './garage-controls.css';

import React from 'react';

class GarageControls extends React.Component {

  render() {
    return (
      <div className='garage-controls'>
        <button className='race-btn'>Race</button>
        <button className='race-btn'>Reset</button>
        <button className='generate-btn' onClick={this.props.onCarsGenerated}>Generate Cars</button>
      </div>
    );
  }

}

export default GarageControls;
