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
import { isAdmin, isSignedIn } from "../../utils/checkLogin";
import { Redirect } from 'react-router-dom';
import Analytics from "./Analytics";
import ApproveImages from "./ApproveImages";
import AdminCompany from "../adminCompany/adminCompany";
import AdminNavbar from "./AdminNavbar";

function AdminHome() {
  if(! isSignedIn()){
    return <Redirect push to="/login" />;
  }
  if(! isAdmin()){
    return <Redirect push to="/invalid" />;
  }
  const { TabPane } = Tabs;
  const tabChange = () => {};
  return (
    <>
    <AdminNavbar></AdminNavbar>
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
            <TabPane tab="Companies" key="4">
              <AdminCompany></AdminCompany>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
