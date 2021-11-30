const config = {
  username: "auro",
  password: "gnQAMYArWg3rqfuntohZ",
  database: "indeed",
  host: "lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 20,
    min: 10,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = config;
