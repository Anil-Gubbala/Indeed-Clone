import React, { Component } from "react";
import { Redirect } from "react-router";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import "./companyHome.css";
import google from "../../images/google.jpeg";
import g from "../../images/g.jpeg";
import Snapshot from "../snapshot/snapshot";
import WhyJoinUs from "../whyjoinus/whyjoinus";
import ReviewsTab from "../reviews/reviews";
import PhotosTab from "../photosTab/photosTab";
import JobsTab from "../jobsTab/jobsTab";
import SalaryTab from "../salaryTab/salaryTab";
import { get, post } from "../../utils/serverCall";
import DashLoginNav from '../navbar/DashLoginNav';

dotenv.config();

const { TabPane } = Tabs;
class companyHomes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyDetails: {} , companyId: '', tab:''};
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const urlCompanyId = query.get('id');
    let urlTab = query.get("tab");
    if(!urlCompanyId){
      //redirect 
      console.log("redirect here");
    }
    if(!urlTab){
      urlTab = 0;
    }
    // this.setState({tab:urlTab});
    // this.setState({companyId:urlCompanyId});

    get("/company?id=" + urlCompanyId)
      .then((response) => {
        console.log(response);
        this.setState({ companyDetails: response });
        post("/updateView", { id: urlCompanyId })
          .then((response) => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const query = new URLSearchParams(this.props.location.search);
    const urlCompanyId = query.get('id');
    let urlTab = query.get("tab");
    if(!urlCompanyId){
      //redirect 
      console.log("redirect here");
    }
    if(!urlTab){
      urlTab = 0;
    }
    // this.state.urlTab = urlTab;
    // urlTab = parseInt(urlTab);
    // console.log(urlTab);

    
     function callback(key){
      switch (key) {
        case "1":
          console.log("one called");
          break;
        case "2":
          console.log("two called");
          break;
        case "3":
          console.log("three called");
          break;
      }
    }
    return (
      <>
      <DashLoginNav/>
        {this.state.companyDetails == {} ? (
          ""
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                width: "100%",
                paddingLeft: "25%",
                paddingRight: "25%",
                background: "white",
              }}
            >
              <div>
                <img
                  src={this.state.companyDetails.companyPicture}
                  style={{
                    width: "960px",
                    height: "200px",
                  }}
                  alt="Company Image"
                />
              </div>

              <div
                style={{
                  marginTop: "25px",
                }}
              >
                <div className="row" style={{ paddingBottom: "15px" }}>
                  <div className="col-md-1" style={{ paddingLeft: "20px" }}>
                    <img
                      src={this.state.companyDetails.companyLogo}
                      className="companyLogo"
                      alt="Company Logo"
                    />
                  </div>
                  <div className="col-md-2 " style={{ paddingLeft: "45px" }}>
                    <div className="row companytxt">
                      {this.state.companyDetails.name}
                    </div>
                    <div className="row"></div>
                  </div>
                </div>
                <div>
                  <div style={{ marginLeft: "10px" }}>
                    <Tabs
                      defaultActiveKey={urlTab}
                      onChange={callback}
                      indicatorColor="secondary"
                      style={{ width: "100%" }}
                    >
                      <TabPane tab="Snapshot" key="1">
                        <Snapshot id={urlCompanyId}/>
                      </TabPane>
                      <TabPane tab="Why Join Us" key="2">
                        <WhyJoinUs id={urlCompanyId} />
                      </TabPane>
                      <TabPane tab="Reviews" key="3">
                        <ReviewsTab id={urlCompanyId}/>
                      </TabPane>
                      <TabPane tab="Salaries" key="4">
                        <SalaryTab id={urlCompanyId}/>
                      </TabPane>
                      <TabPane tab="Photos" key="5">
                        <PhotosTab id={urlCompanyId}/>
                      </TabPane>
                      <TabPane tab="Jobs" key="6">
                        <JobsTab id={urlCompanyId}/>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div className="horizontalRule"></div>
          </>
        )}
      </>
    );
  }
}

export default companyHomes;
