import './winners-table.css';

import React from 'react';

import WinnersContainer from '../winners-container/winners-container';

class WinnersTable extends React.Component {

  constructor() {
    super();
    this.state = {
      sortType: 'wins',
      sortDirection: 'Desc',
    }
  }

  setSortType = (newType) => {
    this.setState(({ sortDirection }) => {
      return { sortType: newType, sortDirection: sortDirection === 'Desc' ? 'Asc' : 'Desc' };
    });
  };

  sortWinners = (winners) => {
    const arr = winners;
    const sortFunc = this.getSortFunc();
    return arr.sort(sortFunc);
  }

  getSortFunc = () => {
    switch (this.state.sortType + this.state.sortDirection) {
      case 'timeAsc':
        return function (a, b) { return (a.time - b.time) };
      case 'timeDesc':
        return function (a, b) { return (b.time - a.time) };
      case 'winsAsc':
        return function (a, b) { return (a.wins - b.wins) };
      case 'winsDesc':
        return function (a, b) { return (b.wins - a.wins) };
      default:
        return function (a, b) { return (a.time - b.time) };
    }
  }

  render() {
    const { winners, pageNum } = this.props;
    const arrow = this.state.sortDirection === 'Asc' ? '↑' : '↓';
    const winsTitle = `Wins ${this.state.sortType === 'wins' ? arrow : ''}`;
    const timeTitle = `Best Time ${this.state.sortType === 'time' ? arrow : ''}`;

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
            onClick={() => this.setSortType('wins')}
            onKeyDown={() => { }}
          >{winsTitle}</span>
          <span
            className="sort-select"
            role='button'
            tabIndex={0}
            onClick={() => this.setSortType('time')}
            onKeyDown={() => { }}
          >{timeTitle}</span>
        </div>
        <WinnersContainer
          winners={this.sortWinners(winners)}
          pageNum={pageNum}
        />
      </div>
    );
  }
}

export default WinnersTable;
