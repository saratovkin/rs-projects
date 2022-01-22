import React from 'react';
import './page-number.css';

class PageNumber extends React.Component {
  render() {
    return (
      <div className="page-number">
      <span>Page</span> 
      <span>{this.props.pageNum + 1}</span> 
      </div>
    );
  }
}

export default PageNumber;
