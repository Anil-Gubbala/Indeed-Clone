const express = require("express");
const router = express.Router();
const jobService = require("../services/jobService");

// save job details
router.post("/job", async (request, response) => {
  try {
    const data = await jobService.saveJobDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving job Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

// get job by job id
router.get("/job", async (request, response) => {
  try {
    const data = await jobService.getJobDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving job Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
