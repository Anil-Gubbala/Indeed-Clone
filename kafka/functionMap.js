const {
  insertTestReviews,
  getAllReviews,
} = require("./services/insertTestRecords");

const functionMap = {
  // import and add your functions here
  insertTestReviews,
  getAllReviews,
};

const callFunction = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  fn(msg, callback);
};

module.exports = { callFunction };
