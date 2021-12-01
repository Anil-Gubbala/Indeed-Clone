const express = require("express");

const router = express.Router();
const mysql = require("mysql");
const userService = require("../services/userService");
const User = require("../db/schema/user");
const constraints = require("../kafka/config");

const sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user: constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database,
});

sqlconnection.getConnection((err) => {
  if (err) {
    throw `Error occured ${err.message}`;
  }
  console.log("pool created");
});
// /**
//  * @swagger
//  *  tags:
//  *    name: Posts
//  *    description: posts of users
//
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

// post user - body details are emailid, password, accounttype
router.post("/use", async (request, response) => {
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

router.post("/user", async (request, response) => {
  console.log(request.body);

  const { emailId, password, accountType } = request.body;
  try {
    sqlconnection.query(
      `SELECT emailId FROM users WHERE emailId=?`,
      emailId,
      (error, results) => {
        console.log(results);
        if (results.length === 0) {
          console.log("New user");
          sqlconnection.query(
            `Insert into users(emailId,password,accountType) values(?,?,?)`,
            [emailId, password, accountType],
            (error, results) => {
              if (error) {
                response.writeHead(200, {
                  "Content-Type": "text-plain",
                });
                // response.send(error.code);
                response.send("failure");
              } else {
                response.writeHead(200, {
                  "Content-Type": "text/plain",
                });
                // res.end(JSON.stringify(results));
                response.end("success");
              }
            }
          );
        } else {
          // console.log("User already existed!");
          response.send("failure");
        }
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while Saving user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

// Get user by id or by emailid, password and account type
router.get("/use", async (request, response) => {
  try {
    console.log(request.query);
    const data = await userService.getUserDetails(request);
    console.log(data);
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

// update user details
router.post("/updateuserprofile", async (request, response) => {
  try {
    const data = await userService.updateUserDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while updating user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.get("/user", async (request, response) => {
  const { emailId, password } = request.query;
  try {
    sqlconnection.query(
      `SELECT * FROM users WHERE emailId=? and password=?`,
      [emailId, password],
      (error, results) => {
        if (results.length !== 0) {
          response.send(JSON.stringify(results));
        } else {
          response.send("failure");
        }
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

// delete resume
router.post("/updateresume", async (request, response) => {
  console.log(request.body);
  try {
    const data = await userService.updateresume(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while updating resume";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;
