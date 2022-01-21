import './winners-container.css';

import React from "react";

import WinnersItem from '../winners-item/winners-item';

const elementsPerPage = 10;

class WinnersContainer extends React.Component {
  render() {
    const { winners, pageNum } = this.props;
    const winnersElements = winners.map((item, index) => {
      const id = item.id;
      return <WinnersItem {...item}
        key={id}
        index={index + pageNum * elementsPerPage} />
    });
    return winnersElements;
  }
}

export default WinnersContainer;
