import './garage-controls.css';

import React from 'react';

class GarageControls extends React.Component {
  render() {
    const { onRaceStart, onRaceReset, onCarsGenerated, isRaceStarted, isStartPossible } = this.props;
    return (
      <div className="garage-controls">
        <button className={isStartPossible ? 'race-btn' : 'race-btn blocked'} onClick={() => { onRaceStart(); }}>Race</button>
        <button className={isRaceStarted ? 'race-btn' : 'race-btn blocked'} onClick={() => { onRaceReset(); }}>Reset</button>
        <button className="generate-btn" onClick={onCarsGenerated}>Generate Cars</button>
      </div>
    );
  }
}

export default GarageControls;
