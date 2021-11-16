const { makeRequest } = require("../kafka/client");

const topics = {
  request: "request-topic",
};
const kafkaRequest = (topic = topics.request, functionName, data, callback) => {
  makeRequest(topic, { functionName, data }, callback);
};

module.exports = { kafkaRequest, topics };
