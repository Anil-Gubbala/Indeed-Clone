const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const User = require('../db/schema/user');
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var constraints = require('../kafka/config');
const config = require('../Utils/config')
const { kafkaRequest } = require('../kafka/kafkaRequest');
const CompanySchema = require("../db/schema/company").createModel();
const saltRounds = 10;

const sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user: constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database,
});

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

sqlconnection.getConnection((err) => {
  if (err) {
    throw 'Error occured ' + err.message;
  }
  console.log('pool created');
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

//post user - body details are emailid, password, accounttype
// router.post('/use', async (request, response) => {
//   console.log(request.body);
//   try {
//     const data = await userService.saveUserDetails(request);
//     response.status(data.status).json(data.body);
//   } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : 'Error while Saving user Details';
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

// router.post("/user", async (request, response) => {
//   console.log(request.body);

//     const {emailId,password,accountType} = request.body;
//     try{
//         sqlconnection.query(`SELECT emailId FROM users WHERE emailId=?`,emailId
//         ,  function (error,results){
//             console.log(results);
//             if(results.length === 0){
//                 console.log("New user");
//                 var user={
//                   "emilId":request.body.emailId,
//                   "password":request.body.password,
//                   "role":request.body.role
//                 }

//                 sqlconnection.query(`Insert into users(emailId,password,accountType) values(?,?,?)`,[
//                     emailId,password,accountType],  function(error,results){
//                   if(error){
//                         response.writeHead(200, {
//                              'Content-Type': 'text-plain'
//                           });
//                          //response.send(error.code);
//                          response.send("failure");
//                      }else{
//                           response.writeHead(200,{
//                              'Content-Type': 'text/plain'
//                          });
//                          console.log(results);

//                          res.send(JSON.stringify(results));

//                          //response.end("success");
//                      }
//                  });

//   }else{
//     //console.log("User already existed!");
//    response.send("failure");
// }
// });

// } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : "Error while Saving user Details";
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

router.post('/user', (req, res) => {
  const { emailId, password, accountType } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      sendError(res, 404, err.code);
      return;
    } else {
      kafkaRequest(
        "admin",
        'registerUser',
        { emailId, password:hash, accountType },
        (err, result) => {
          if (err) {
            sendError(
              res,
              409,
              err.code === 11000 ? 'email already registered' : err.code
            );
          } else {
            res.status(200).send();
          }
        }
      );
    }
  });
});

router.get('/user', async (req, res) => {
  const { emailId, password } = req.query;
  kafkaRequest(
    "admin",
    'getPassword',
    { emailId },
    (err, result) => {
      if (err) {
        sendError(res, 404, err.code);
      } else if (result) {
        bcrypt.compare(
          password,
          result.password,
          (error, response) => {
            if (response) {
              let userInfo = {
                ...result
              };
              delete userInfo['password'];
              const token = jwt.sign(userInfo, config.secret, {
                expiresIn: 1008000,
              });
              res.status(200).send({ token: `JWT ${token}`, user: userInfo });
            } else {
              res
                .status(404)
                .send({ err: 'Wrong username/password combination!' });
            }
          }
        );
      } else {
        res.status(404).send({ err: "User doesn't exist" });
      }
    }
  );
});


router.get("/userReviews", async (request, response) => {
  // const id = request.query.id;
  const id = "61a5f182d511b8e0df9b5fda";
  try {
    sqlconnection.query(
      `SELECT * FROM reviews WHERE userId=?`,
      id,
      function (error, results) {
        const resultMap = {};
        results.forEach((each)=>{
          resultMap[each.companyId] = each;
        });

        const keys = Object.keys(resultMap);
        console.log(keys);
        CompanySchema.find({ _id: { $in: keys } })
        .select(["name"])
        .then((res) => {
          const resMap = [];
          res.forEach((each) => {
            const temp = {};
            temp._id = each._id;
            temp.name = each.name;
            temp.results = resultMap[each._id];
            resMap.push(temp);
          });
          console.log(resMap);
        response.send(resMap);
      }
    );
  })} catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting user Details";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

//Get user by id or by emailid, password and account type
// router.get('/use', async (request, response) => {
//   try {
//     console.log(request.query);
//     const data = await userService.getRating(request);
//     console.log(data);
//     response.status(data.status).json(data.body);
//   } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : 'Error while getting user Details';
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

// router.get('/user', async (request, response) => {
//   const { emailId, password } = request.query;
//   try {
//     sqlconnection.query(
//       `SELECT * FROM users WHERE emailId=? and password=?`,
//       [emailId, password],
//       function (error, results) {
//         if (results.length !== 0) {
//           response.send(JSON.stringify(results));
//         } else {
//           response.send('failure');
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : 'Error while getting user Details';
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

// router.get('/use', async (request, response) => {
//   try {
//     console.log(request.query);
//     const data = await userService.getRating(request);
//     console.log(data);
//     response.status(data.status).json(data.body);
//   } catch (err) {
//     console.log(err);
//     const message = err.message
//       ? err.message
//       : 'Error while getting user Details';
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

router.get('/signout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send();
  } else {
    res.send();
  }
});

module.exports = router;
