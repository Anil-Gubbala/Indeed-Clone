const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// /**
//  * @swagger
//  *  tags:
//  *    name: Posts
//  *    description: posts of users
//  */

// /**
//  * @swagger
//  * /posts:
//  *   get:
//  *     summary: Returns all posts
//  *     tags: [Posts]
//  *     responses:
//  *       200:
//  *         description: the list of the posts
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Post'
//  */

//post user - body details are emailid, password, accounttype
router.post("/user", async (request, response) => {
  console.log(request.body);
  try {
    const data = await userService.saveUserDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//Get user by id or by emailid, password and account type
router.get("/user", async (request, response) => {
  try {
    const data = await userService.getUserDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
