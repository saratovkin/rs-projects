import React from "react";
import './page-number.css';

class PageNumber extends React.Component {

  render() {
    return (
      <p className="page-number">Page {this.props.pageNum + 1}</p>
    )
  }
}

export default PageNumber;