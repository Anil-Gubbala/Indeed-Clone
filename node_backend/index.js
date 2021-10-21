const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "*", credentials: true }));
const user = require("./routes/userRoute");
const connection = require("./db/connection");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });

async function initializeApplication() {
  try {
    app.use(user);
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

module.exports = app;
