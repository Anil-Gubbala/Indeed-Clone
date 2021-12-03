const express = require("express");

const router = express.Router();
const companyService = require("../services/companyService");
var constraints = require("../kafka/config");
var mysql = require("mysql");
const { result } = require("lodash");

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

router.post("/salary", async (request, response) => {
  console.log(request.body);
  try {
    const data = await companyService.saveSalaryDetails(request);
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

router.get("/salary", async (request, response) => {
  try {
    const data = await companyService.getSalaryDetails(request);
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

router.get("/admincompanies", async (request, response) => {
  try {
    console.log(request.query);
    const data = await companyService.getAdminCompanies(request);
    response.status(200).json(data);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting company photos";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.get("/admincompanyreviews", async (request, response) => {
  try {
    console.log(request.query.id);
    const data = await sqlconnection.query(
      `select * from reviews where companyId=? limit 10 OFFSET ?`,
      [request.query.id,parseInt(request.query.page)],
      function (error, results) {
        response.send(results);
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting admin reviews";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.get("/admincompanyreviewsCount", async (request, response) => {
  try {
    const data = await sqlconnection.query(
      `select count(*) as total from reviews where companyId=?`,
      [request.query.id],
      function (error, results) {
        response.send(results);
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting admin reviews";
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
    console.log(request.body);
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

router.get("/reviews", async (request, response) => {
  const id = request.query.id;
  try {
    sqlconnection.query(
      `SELECT * FROM reviews WHERE companyId=?`,
      id,
      function (error, results) {
        response.send(results);
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

router.post("/reviews", async (request, response) => {
  try {
    const data = await sqlconnection.query(
      `insert into reviews (companyId,userId,date,upVotes,downVotes,rating,summary,review,pros,cons,approval,prep,createdAt,updatedAt,status,featured) values (?,?,NOW(),?,?,?,?,?,?,?,?,?,NOW(),?,?,?)`,
      [
        request.body.companyId,
        request.body.userId,
        // request.body.date,
        request.body.upvotes,
        request.body.downVotes,
        request.body.rating,
        request.body.summary,
        request.body.review,
        request.body.pros,
        request.body.cons,
        request.body.approval,
        request.body.prep,
        // request.body.createdAt,
        request.body.updatedAt,
        request.body.status,
        request.body.featured,
      ],
      // "SELECT * FROM reviews",
      function (error, results) {
        console.log(error);
        console.log(results);
        response.send(results);
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
    await companyService.getCompanyDetails_nameloc(request, response);
    // console.log("data",data);
    // response.status(data.status).json(data.body);
  } catch (err) {
    console.log(err);
    const message = err.message
      ? err.message
      : "Error while getting company Details by name and/or location";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.put("/upvoterating", async (request, response) => {
  try {
    const data = await sqlconnection.query(
      "update reviews set upVotes=upVotes+1 where reviews._id=?",
      request.query.id,
      function (error, results) {
        console.log(error);
        console.log(results);
        response.send(results);
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while Up voting";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.put("/downvoterating", async (request, response) => {
  try {
    const data = await sqlconnection.query(
      "update reviews set upVotes=upVotes-1 where reviews._id=?",
      request.query.id,
      function (error, results) {
        console.log(error);
        console.log(results);
        response.send(results);
      }
    );
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while down voting";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.post("/applytoajob", async (request, response) => {
  try {
    console.log(request.body.id);
    const data = await companyService.applyToAJob(request);
    response.status(200).json(data);
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error applyingto a job";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

// router.put("/upvoterating", async (request, response) => {
//   try {
//     const check = await sqlconnection.query(
//       "select * from reviews where _id=? and userId=?",
//       [request.query.id, request.query.userId],
//       async function (error, results) {
//         if (results.length > 0) response.send({ updated: false });
//         else {
//           const data = await sqlconnection.query(
//             "update reviews set upVotes=upVotes+1 where reviews._id=?;insert into userReview (user_id,review_id) values (?,?)",
//             [
//               request.query.id,
//               request.query.userId,
//               request.query.userId,
//               request.query.id,
//             ],
//             function (error, results) {
//               console.log(error);
//               console.log(results);
//               response.send({ updated: true });
//             }
//           );
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     const message = err.message ? err.message : "Error while upvoting a rating";
//     const code = err.statusCode ? err.statusCode : 500;
//     return response.status(code).json({ message });
//   }
// });

module.exports = router;
