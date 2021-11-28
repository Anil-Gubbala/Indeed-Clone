const express = require("express");
const router = express.Router();
const userService = require("../services/jobApplicationService");

//POST JOB APPLICATION
router.post("/jobApplication", async (request, response) => {
  console.log(request.body);
  try {
    const data = await userService.saveJobApplicationDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving job application Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//GET JOB APPLICATION BY JOB ID
router.get("/jobApplication", async (request, response) => {
  try {
    const data = await userService.getJobApplicationByJobId(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving job application Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
