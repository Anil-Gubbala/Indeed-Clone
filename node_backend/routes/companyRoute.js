const express = require("express");

const router = express.Router();
const companyService = require("../services/companyService");
var constraints = require("../kafka/config");
var mysql = require("mysql");

var sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user: constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database,
});

sqlconnection.getConnection((err) => {
  if (err) {
    throw "Error occured " + err.message;
  }
  console.log("pool created");
});
//post company details
router.post("/company", async (request, response) => {
  console.log(request.body);
  try {
    const data = await companyService.saveCompanyDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving company Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

// //Get company by id or by emailid, password and account type
// router.get("/company", async (request, response) => {
//   try {
//     const data = await companyService.getCompanyDetails(request);
//     response.status(data.status).json(data.body);
//   } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : "Error while getting company Details";
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

router.get("/company", async (request, response) => {
  try {
    const data = await companyService.getCompanyDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting company Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.get("/photos", async (request, response) => {
  try {
    console.log(request.query);
    const data = await companyService.getCompanyPhotos(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting company photos";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.post("/photos", async (request, response) => {
  try {
    const data = await companyService.postCompanyPhotos(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while daving company photos";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.get("/getrating", async (request, response) => {
  const companyId = request.body.companyId;
  try {
    sqlconnection.query(
      `SELECT * FROM reviews WHERE companyId=?`,
      companyId,
      function (error, results) {
        response.send(JSON.stringify(results));
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

// Get company by name and/or location
router.get("/companySearch", async (request, response) => {
  try {
    console.log("Entered company");
    const data = await companyService.getCompanyDetails_nameloc(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting company Details by name and/or location";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
