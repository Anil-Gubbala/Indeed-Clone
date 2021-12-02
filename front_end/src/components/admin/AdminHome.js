import React from "react";
import MostReviewedCompanies from "./MostReviewedCompanies";
import MostViewedCompanies from "./MostViewedCompanies";
import ReviewsPerDay from "./ReviewsPerDay";
import TopJobSeekers from "./TopJobSeekers";
import TopRatedCEOs from "./TopRatedCEOs";
import TopRatedCompanies from "./TopRatedCompanies";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import ApproveReviews from "./ApproveReviews";
import { isAdmin } from "../../utils/checkLogin";
import { Redirect } from 'react-router-dom';
import Analytics from "./Analytics";
import ApproveImages from "./ApproveImages";

function AdminHome() {
  // if(! isAdmin()){
  //   return <Redirect push to="/login" />;
  // }
  const { TabPane } = Tabs;
  const tabChange = () => {};
  return (
    <>
      {/* <ReviewsPerDay></ReviewsPerDay>
      <MostViewedCompanies></MostViewedCompanies>
      <MostReviewedCompanies></MostReviewedCompanies>
      <TopJobSeekers></TopJobSeekers>
      <TopRatedCEOs></TopRatedCEOs>
      <TopRatedCompanies></TopRatedCompanies> */}
      <div>
        <div style={{ marginLeft: "10px" }}>
          <Tabs
            defaultActiveKey="1"
            onChange={tabChange}
            // indicatorColor="secondary"
            style={{ width: "100%" }}
          >
            <TabPane tab="Approve Reviews" key="1">
              <ApproveReviews></ApproveReviews>
            </TabPane>
            <TabPane tab="Approve Pictures" key="2">
              <ApproveImages></ApproveImages>
            </TabPane>
            <TabPane tab="Analytics" key="3">
              <Analytics></Analytics>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
