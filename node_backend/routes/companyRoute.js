const express = require("express");
const router = express.Router();
const companyService = require("../services/companyService");

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

//Get company by id or by emailid, password and account type
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

// //Get jobs in a company
// router.get("/company/jobs", async (request, response) => {
//   try {
//     const data = await companyService.getCompanyJobs(request);
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

module.exports = router;