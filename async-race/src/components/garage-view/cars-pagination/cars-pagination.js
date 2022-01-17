import React from "react";
import './cars-pagination.css';

class CarsPagination extends React.Component {

  render() {
    const { pagesAmount } = this.props;
    const paginationButtons = Array(pagesAmount).fill(0).map((item, index) => {
      return <span
        className={this.props.pageNum === index ? "pag-btn active" : "pag-btn"}
        key={index}
        onClick={() => { this.props.onPageChange(index); window.scrollTo(0, 0); }}>{index + 1}</span>
    });
    return (<div className="pagination">{paginationButtons}</div>);
  };
}

export default CarsPagination;