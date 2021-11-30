import React from 'react';
import MostReviewedCompanies from './MostReviewedCompanies';
import MostViewedCompanies from './MostViewedCompanies';
import ReviewsPerDay from './ReviewsPerDay';
import TopJobSeekers from './TopJobSeekers';
import TopRatedCEOs from './TopRatedCEOs';
import TopRatedCompanies from './TopRatedCompanies';

function AdminHome() {
  return (
    <>
      <ReviewsPerDay></ReviewsPerDay>
      <MostViewedCompanies></MostViewedCompanies>
      <MostReviewedCompanies></MostReviewedCompanies>
      <TopJobSeekers></TopJobSeekers>
      <TopRatedCEOs></TopRatedCEOs>
      <TopRatedCompanies></TopRatedCompanies>
    </>
  );
}

export default AdminHome;
