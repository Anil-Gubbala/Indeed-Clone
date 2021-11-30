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
} = require("../services/Admin");

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
