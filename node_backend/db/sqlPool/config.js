const Sequelize = require("sequelize");

const config = {
  username: "auro",
  password: "gnQAMYArWg3rqfuntohZ",
  database: "indeed",
  host: "lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
  operatorsAliases: false,
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
  pool: {
    max: 20,
    min: 10,
    acquire: 300000,
    idle: 10000,
  },
};

module.exports = config;
