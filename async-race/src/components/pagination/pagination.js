import React from 'react';
import './pagination.css';

class Pagination extends React.Component {
  render() {
    const {
      pagesAmount, onRaceReset, onPageChanged, pageNum,
    } = this.props;
    const paginationButtons = Array(pagesAmount).fill(0).map((item, index) => (
      <span
        role="button"
        tabIndex={0}
        className={pageNum === index ? 'pag-btn active' : 'pag-btn'}
        key={index}
        onClick={() => { onPageChanged(index); onRaceReset(); window.scrollTo(0, 0); }}
        onKeyDown={() => { onPageChanged(index); onRaceReset(); window.scrollTo(0, 0); }}
      >
        {index + 1}
      </span>
    ));
    return (<div className="pagination">{paginationButtons}</div>);
  }
}

export default Pagination;
