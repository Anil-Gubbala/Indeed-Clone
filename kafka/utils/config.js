const config = {
  // KAFKA_HOST: "localhost",
  KAFKA_HOST: "ec2-3-137-217-134.us-east-2.compute.amazonaws.com",
  KAFKA_PORT: 9092,
  mongoDB: "mongodb+srv://root:indeed123@indeedcluster.cvgcp.mongodb.net/Indeed?retryWrites=true&w=majority",
};

module.exports = { config };
