const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const createConnection = async function () {
  const options = {
    autoIndex: false,
    maxPoolSize: 50,
    connectTimeoutMS: 10000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!process.env.MONGO_CONN_URL) {
    console.log("MongoDB environment variables not set");
    throw "Error While connecting to MongoDB";
  }
  const mongo_url = process.env.MONGO_CONN_URL;
  await mongoose
    .connect(mongo_url, options)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Failed to connect to MongoDB");
      console.log(err);
    });
};

const closeConnection = async function () {
  mongoose.connection.close();
};

module.exports.createConnection = createConnection;
module.exports.closeConnection = closeConnection;
