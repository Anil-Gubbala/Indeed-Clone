const config = {
  KAFKA_HOST: "ec2-3-15-189-94.us-east-2.compute.amazonaws.com",
  // KAFKA_HOST: "localhost",
  KAFKA_PORT: 9092,
  mongoDB:
    "mongodb+srv://root:indeed123@indeedcluster.cvgcp.mongodb.net/Indeed?retryWrites=true&w=majority",
};

module.exports = { config };
