import './winners-table.css';

import React from 'react';

import WinnersContainer from '../winners-container/winners-container';

class WinnersTable extends React.Component {

  render() {
    const { winners, pageNum, onSortTypeSelected, sortType, sortDirection } = this.props;
    const arrow = sortDirection === 'Asc' ? '↑' : '↓';
    const winsTitle = `Wins ${sortType === 'wins' ? arrow : ''}`;
    const timeTitle = `Best Time ${sortType === 'time' ? arrow : ''}`;

    return (
      <div className="winners-table">
        <div className="table-row">
          <span>Number</span>
          <span>Car</span>
          <span>Name</span>
          <span
            className="sort-select"
            role='button'
            tabIndex={0}
            onClick={() => onSortTypeSelected('wins')}
            onKeyDown={() => { }}
          >{winsTitle}</span>
          <span
            className="sort-select"
            role='button'
            tabIndex={0}
            onClick={() => onSortTypeSelected('time')}
            onKeyDown={() => { }}
          >{timeTitle}</span>
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
