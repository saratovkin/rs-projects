import React from "react";
import './cars-pagination.css';

class CarsPagination extends React.Component {

  render() {
    const { pagesAmount, onRaceReset, onPageChange, pageNum } = this.props;
    const paginationButtons = Array(pagesAmount).fill(0).map((item, index) => {
      return <span
        className={pageNum === index ? "pag-btn active" : "pag-btn"}
        key={index}
        onClick={() => { onPageChange(index); onRaceReset(); window.scrollTo(0, 0); }}>{index + 1}</span>
    });
    return (<div className="pagination">{paginationButtons}</div>);
  };
}

export default CarsPagination;