const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const cors = require("cors");
var constraints = require("./kafka/config");
var mysql = require('mysql');

// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
app.use(cors({ origin: "*", credentials: true }));

const user = require("./routes/userRoute");
const company = require("./routes/companyRoute");
const job = require("./routes/jobRoute");
const jobApplication = require("./routes/jobApplicationRoute");
const message = require("./routes/messageRoute");
const testRecords = require("./routes/testRecords");
const admin = require("./routes/adminRoute");
const EditCompanyName = require("./routes/EditCompanyName");
const EditCompanyRole = require("./routes/EditCompanyRole");
const EditCompanyAddress = require("./routes/EditCompanyAddress");
const Profile = require("./routes/Profile")
const AddCompany = require("./routes/AddCompany")
const GetCompany = require("./routes/GetCompany")
const edit = require("./routes/EditCompanyPage")
const AddImg = require("./routes/AddImg")

const connection = require("./db/connection");

app.use(session({
  secret: 'mysql',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

var sqlconnection = mysql.createPool({
 host: constraints.DB.host,
 user:constraints.DB.username,
 password: constraints.DB.password,
 port: constraints.DB.port,
 database: constraints.DB.database
});

sqlconnection.getConnection((err) => {
  if(err){
      throw 'Error occured ' + err.message;
  }
  console.log("pool created");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "A simple Express Library API",
//       termsOfService: "http://example.com/terms/",
//       contact: {
//         name: "API Support",
//         url: "http://www.exmaple.com/support",
//         email: "support@example.com",
//       },
//     },

//     servers: [
//       {
//         url: "http://localhost:4001",
//         description: "My API Documentation",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };
app.use("/edit",edit)

async function initializeApplication() {
  try {
    app.use(user);
    app.use(company);
    app.use(job);
    app.use(jobApplication);
    app.use(message);
    app.use(testRecords);
    app.use(admin);
    app.use(EditCompanyName);
    app.use(EditCompanyRole);
    app.use(EditCompanyAddress)
    app.use(Profile)
    app.use(AddCompany)
    app.use(GetCompany)
    app.use(AddImg)

    await connection.createConnection();
    app.listen(process.env.PORT || 8080, () => {
      console.log("App listening on port 8080");
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
  return Promise.resolve();
}

initializeApplication()
  .then((response) => console.log("Server Running"))
  .catch((error) =>
    // logger.error(`Error in Initalizing Application  : ${error}`)
    console.log(error)
  );

// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
