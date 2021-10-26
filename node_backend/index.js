const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
app.use(cors({ origin: "*", credentials: true }));

const user = require("./routes/userRoute");
const company = require("./routes/companyRoute");
const job = require("./routes/jobRoute");
const jobApplication = require("./routes/jobApplicationRoute");
const message = require("./routes/messageRoute");

const connection = require("./db/connection");
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

async function initializeApplication() {
  try {
    app.use(user);
    app.use(company);
    app.use(job);
    app.use(jobApplication);
    app.use(message);

    await connection.createConnection();
    app.listen(process.env.PORT || 8080, () => {
      console.log("App listening on port 8080");
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
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
