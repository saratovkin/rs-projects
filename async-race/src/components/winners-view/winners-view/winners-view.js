import React from 'react';
import './winners-view.css';

import WinnersCounter from '../winners-counter/winners-counter';
import WinnersTable from '../winners-table/winners-table';
import PageNumber from '../../page-number/page-number';
import Pagination from '../../pagination/pagination';

const elementsPerPage = 10;

class WinnersView extends React.Component {

  constructor() {
    super();
    this.state = {

    }
  }

  getDisplayedWinners() {
    const idx = this.props.page * elementsPerPage;
    const winnersOnPage = this.sortWinners(this.props.winners).slice(idx, idx + elementsPerPage);
    return winnersOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.winners.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.props.onPageChanged('view', pageNum);
  }

  sortWinners = (winners) => {
    const arr = winners;
    const sortFunc = this.getSortFunc();
    return arr.sort(sortFunc);
  }

  getSortFunc = () => {
    switch (this.props.sortType + this.props.sortDirection) {
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
    const { page, onSortTypeSelected, sortType, sortDirection } = this.props;
    return (
      <div className="winners-view">
        <WinnersCounter count={this.props.winners.length} />
        <PageNumber pageNum={page} />
        <WinnersTable
          winners={this.getDisplayedWinners()}
          pageNum={page}
          onSortTypeSelected={onSortTypeSelected}
          sortType={sortType}
          sortDirection={sortDirection}
        />
        <Pagination
          onRaceReset={() => { }}
          pagesAmount={this.getAmountOfPages()}
          onPageChanged={this.setPage}
          pageNum={page}
        />
      </div>
    );
  }
}

export default WinnersView;
