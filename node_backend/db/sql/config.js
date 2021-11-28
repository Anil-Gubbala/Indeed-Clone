const Sequelize = require("sequelize");

const config = {
  username: "auro",
  password: "gnQAMYArWg3rqfuntohZ",
  database: "indeed",
  host: "lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 150000,
  },
  retry: {
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      /Deadlock/i,
      "SQLITE_BUSY",
    ],
    max: 5,
  },
  // dialectOptions: { connectTimeout: isDevEnv ? 15000 : 5000 }
  operatorsAliases: false,
  // pool: {
  //   max: 1,
  //   min: 0,
  //   acquire: 3000000,
  //   idle: 10000,
  // },
};

module.exports = config;
