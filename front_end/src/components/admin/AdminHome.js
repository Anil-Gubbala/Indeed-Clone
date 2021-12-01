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

function AdminHome() {
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
              {/* <ReviewsTab /> */}
            </TabPane>
            <TabPane tab="Analytics" key="3">
              {/* <Snapshot /> */}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
