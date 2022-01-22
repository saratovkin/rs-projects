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
      pageNum: 0,
    };
  }

  getDisplayedWinners() {
    const idx = this.state.pageNum * elementsPerPage;
    const winnersOnPage = this.props.winners.slice(idx, idx + elementsPerPage);
    return winnersOnPage;
  }

  getAmountOfPages() {
    return Math.ceil(this.props.winners.length / elementsPerPage);
  }

  setPage = (pageNum) => {
    this.setState(() => ({ pageNum }));
  };

  render() {
    return (
      <div className="winners-view">
        <WinnersCounter count={this.props.winners.length} />
        <PageNumber pageNum={this.state.pageNum} />
        <WinnersTable
          winners={this.getDisplayedWinners()}
          pageNum={this.state.pageNum}
        />
        <Pagination
          onRaceReset={() => { }}
          pagesAmount={this.getAmountOfPages()}
          onPageChanged={this.setPage}
          pageNum={this.state.pageNum}
        />
      </div>
    );
  }
}

export default WinnersView;
