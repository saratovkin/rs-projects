import './winners-table.css';

import React from "react";

import WinnersContainer from '../winners-container/winners-container';

class WinnersTable extends React.Component {

  
  render() {
    const { winners,pageNum } = this.props;
    return (
      <div className="winners-table">
        <div className="table-row">
          <span>Number</span>
          <span>Car</span>
          <span>Name</span>
          <span>Wins</span>
          <span>Best Time</span>
        </div>
        <WinnersContainer
          winners={winners}
          pageNum={pageNum}
        />
      </div>
    );
  }
}

export default WinnersTable;
