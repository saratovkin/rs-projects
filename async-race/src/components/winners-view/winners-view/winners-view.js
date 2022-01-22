import React from 'react';
import './winners-view.css';

import WinnersCounter from '../winners-counter/winners-counter';
import WinnersTable from '../winners-table/winners-table';
import PageNumber from '../../page-number/page-number';
import Pagination from '../../pagination/pagination';

const elementsPerPage = 10;

class WinnersView extends React.Component {

  getDisplayedWinners() {
    const idx = this.props.page * elementsPerPage;
    const winnersOnPage = this.props.winners.slice(idx, idx + elementsPerPage);
    return winnersOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.winners.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.props.onPageChanged('view', pageNum);
  }

  render() {
    const { page } = this.props;
    return (
      <div className="winners-view">
        <WinnersCounter count={this.props.winners.length} />
        <PageNumber pageNum={page} />
        <WinnersTable
          winners={this.getDisplayedWinners()}
          pageNum={page}
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
