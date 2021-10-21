const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/user/signup", async (request, response) => {
  console.log(request.body);
  try {
    const data = await userService.saveUserDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while Saving students";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
