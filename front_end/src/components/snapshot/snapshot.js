import React, { Component } from 'react';
import './snapshot.css';
import ceo from '../../images/ceo.jpeg';

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>
          <label className="componenttag">Google Careers and Employment</label>
          <div>
            <div className="subHeading">Work happiness</div>
            <div className="">
              <div className="col-md-3 "></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div>
            <div className="subHeading">About the company</div>
            <div className="row" style={{ marginTop: '35px' }}>
              <div className="col-md-2 ">
                <img src={ceo} className="ceo1" alt="CEO Image" />
              </div>
              <div className="col-md-10" style={{ marginTop: '0px', paddingTop: '0px !important' }}>
                <ul className="detailsBox row" style={{ marginTop: '-10px' }}>
                  <li className="box">
                    <div class="libox1">CEO</div>
                    <div class="libox2">Sundar Pichai</div>
                  </li>
                  <li className="box">
                    <div class="libox1">Founded</div>
                    <div class="libox2">1998</div>
                  </li>
                  <li className="box">
                    <div class="libox1">company size</div>
                    <div class="libox2">more than 10,000</div>
                  </li>
                  <li className="box">
                    <div class="libox1">Revenue</div>
                    <div class="libox2">$ 10B (USD)</div>
                  </li>
                </ul>
                <ul>
                  <li className="box" style={{ marginLeft: '-5px' }}>
                    <div class="libox1">Industry</div>
                    <div class="libox2">Information Technology</div>
                  </li>
                </ul>
                <div>This is all text</div>
              </div>
            </div>
          </div>
          <div>
            <div className="subHeading">Jobs near you</div>
            <div>You're seeing Google jobs close to San Jose, CA.</div>
            <div className="nearJobs">
              <div className="nearJobs1"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Snapshot;
