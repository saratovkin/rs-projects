import React from "react";

class CarsPagination extends React.Component {

  state = {
    pages: 0,
  }

  render() {
    const { pagesAmount } = this.props;
    console.log(pagesAmount);
    return (
      <div>test</div>
    );
  }
}

export default CarsPagination;