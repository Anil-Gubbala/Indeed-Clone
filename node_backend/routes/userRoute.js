const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const User=require("../db/schema/user");
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var constraints = require("../kafka/config");
const config = require('config');

var sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user:constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database
 });

 sqlconnection.getConnection((err) => {
  if(err){
      throw 'Error occured ' + err.message;
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



//post user - body details are emailid, password, accounttype
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
  
    const {emailId,password,accountType} = request.body;
    try{  
        sqlconnection.query(`SELECT emailId FROM users WHERE emailId=?`,emailId
        ,  function (error,results){
            console.log(results);
            if(results.length === 0){
                console.log("New user");
                var user={
                  "emilId":request.body.emailId,
                  "password":request.body.password,
                  "role":request.body.role
                }
                
                sqlconnection.query(`Insert into users(emailId,password,accountType) values(?,?,?)`,[
                    emailId,password,accountType],  function(error,results){
                  if(error){
                        
                         response.send("failure");
                     }else{
                          
                         
                        
                         response.send(JSON.stringify(results));

                         //response.end("success");
                     }
                 });
          
  }else{
    //console.log("User already existed!");
   response.send("failure");
}
});

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
router.get("/use", async (request, response) => {
  try {
    console.log(request.query);
    const data = await userService.getRating(request);
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



router.get("/user", async (request, response) => {
  
  const {emailId,password} = request.query;
  try {
    sqlconnection.query(`SELECT * FROM users WHERE emailId=? and password=?`,[emailId,password
    ],  function(error,results){
        if(results.length !== 0){
            response.send(JSON.stringify(results));
         }else{
            response.send("failure");
         }
        });
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
