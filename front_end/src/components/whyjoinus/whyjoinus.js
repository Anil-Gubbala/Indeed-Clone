import React, { Component } from "react";
import axios from "axios";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
class WhyJoinUs extends Component {
  constructor(props) {
    super(props);
    this.state = { companyDetails: {} };
  }
  componentDidMount() {
    get("/company?id=" + "61a3fd8c6a262725310f68f0")
      .then((response) => {
        console.log(response);
        this.setState({ companyDetails: response });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderCompanyDetails = () => {
    return (
      <>
        <div>
          <div className="subHeading">About</div>
          <div>{this.state.companyDetails.about}</div>
          <div className="subHeading" style={{ marginTop: "20px" }}>
            Work culture
          </div>
          <div>{this.state.companyDetails.culture}</div>
          <div className="subHeading" style={{ marginTop: "20px" }}>
            Company values
          </div>
          <div>{this.state.companyDetails.values}</div>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        <div>
          {this.state.companyDetails == {} ? "" : this.renderCompanyDetails()}
        </div>
      </>
    );
  }
}

export default WhyJoinUs;
