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
