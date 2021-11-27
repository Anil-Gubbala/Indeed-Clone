import React, { Component } from 'react';
class ReviewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ display: 'inline-flex' }}>
          <div className="subHeading">Google Employee Reviews</div>
          <div>
            <button>Review this company</button>
          </div>
        </div>
      </>
    );
  }
}

export default ReviewsTab;
