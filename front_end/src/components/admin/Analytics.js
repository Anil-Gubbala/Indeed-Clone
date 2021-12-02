import { Grid } from "@mui/material";
import React from "react";
import MostReviewedCompanies from "./MostReviewedCompanies";
import MostViewedCompanies from "./MostViewedCompanies";
import ReviewsPerDay from "./ReviewsPerDay";
import TopJobSeekers from "./TopJobSeekers";
import TopRatedCEOs from "./TopRatedCEOs";
import TopRatedCompanies from "./TopRatedCompanies";
import "./Admin.css"

function Analytics() {
  return (
    <div className="adminAnalytics">
      <Grid style={{marginLeft:"0px"}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid itemProp>
          <ReviewsPerDay></ReviewsPerDay>
        </Grid>
        <Grid item>
          <MostViewedCompanies></MostViewedCompanies>
        </Grid>
        <Grid item>
          <MostReviewedCompanies></MostReviewedCompanies>
        </Grid>
        <Grid item>
          <TopJobSeekers></TopJobSeekers>
        </Grid>
        <Grid item>
          <TopRatedCEOs></TopRatedCEOs>
        </Grid>
        <Grid item>
          <TopRatedCompanies></TopRatedCompanies>
        </Grid>
      </Grid>
      {/* <ReviewsPerDay></ReviewsPerDay>
      <MostViewedCompanies></MostViewedCompanies>
      <MostReviewedCompanies></MostReviewedCompanies>
      <TopJobSeekers></TopJobSeekers>
      <TopRatedCEOs></TopRatedCEOs>
      <TopRatedCompanies></TopRatedCompanies> */}
    </div>
  );
}

export default Analytics;
