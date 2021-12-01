import React, { Component } from 'react';
import './jobsTab.css';

class JobsTab extends Component {
  constructor(props) {
    super(props);
    this.state = { what: '', where: '' };
  }
  render() {
    return (
      <>
        <div>
          <div className="subHeading stick">Google Jobs</div>
          <div style={{ display: 'flex' }}>
            <div className="col-md-5" style={{ paddingLeft: '0px' }}>
              <div className="shead">what</div>
              <div className="sSub">job title, keywords</div>
              <div>
                <input className="jobtxt"></input>
              </div>
            </div>
            <div className="col-md-5" style={{ paddingLeft: '0px' }}>
              <div className="shead">where</div>
              <div className="sSub">city, state, or zip</div>
              <div>
                <input className="jobtxt"></input>
              </div>
            </div>
            <div className="col-md-2" style={{ paddingLeft: '0px' }}>
              <button className="jobbtn">Find Jobs</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <div className="col-md-4"> jobs list</div>
          <div className="col-md-8 stick">job desc</div>
        </div>
      </>
    );
  }
}

export default JobsTab;
