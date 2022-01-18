import './garage-controls.css';

import React from 'react';

class GarageControls extends React.Component {

  render() {
    const { onRaceToggle, onCarsGenerated } = this.props;
    return (
      <div className='garage-controls'>
        <button className='race-btn' onClick={()=>{onRaceToggle(true)}}>Race</button>
        <button className='race-btn' onClick={()=>{onRaceToggle(false)}}>Reset</button>
        <button className='generate-btn' onClick={onCarsGenerated}>Generate Cars</button>
      </div>
    );
  }
}

export default GarageControls;
