const {
  insertTestReviews,
  getAllReviews,
} = require("../services/insertTestRecords");

const {
  updateView,
  getMostViewedCompanies,
  getReviewsCountByDay,
  getTopRatedCompanies,
  getMostReviewedCompanies,
  getTopRatedCEOs,
  getTopJobSeekers,
  getCompanyJobStatistics,
  getUnfilteredReviews,
  getUnfilteredImages,
  flagReview,
  flagImage,
  getCompanyStatistics,
} = require("../services/Admin");

const {
  getPassword, registerUser
} = require("../services/account");

const functionMap = {
  // import and add your functions here
  insertTestReviews,
  getAllReviews,

  // admin
  updateView,
  getMostViewedCompanies,
  getReviewsCountByDay,
  getTopRatedCompanies,
  getMostReviewedCompanies,
  getTopRatedCEOs,
  getTopJobSeekers,
  getCompanyJobStatistics,
  getUnfilteredReviews,
  getUnfilteredImages,
  flagReview,
  flagImage,
  getPassword, registerUser,getCompanyStatistics
};

const handle_request = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  if (!fn) {
    console.log(`${msg.functionName} not exists`);
  } else {
    fn(msg, callback);
  }
};

exports.handle_request = handle_request;
