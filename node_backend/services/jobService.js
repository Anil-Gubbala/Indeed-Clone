const _ = require("lodash");
const dotenv = require("dotenv");
var mysql = require("mysql");
var constraints = require("../kafka/config");
dotenv.config();
const jobSchema = require("../db/schema/job").createModel();
const operations = require("../db/operations");
const { request } = require("express");
const sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user: constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database,
});

exports.saveJobDetails = async (request) => {
  try {
    // console.log(request.body.id);
    let response = {};
    if (!request.body.id) {
      response = await operations.saveDocuments(jobSchema, request.body, {
        runValidators: false,
      });
    } else
      response = await operations.updateField(
        jobSchema,
        { id: request.body.id },
        request.body
      );

    return { status: 200, body: response };
  } catch (err) {
    const message = err.message
      ? err.message
      : "Error while saving job details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

// get job details
exports.getJobDetails = async (request) => {
  try {
    if (request.query.id) {
      const response = await operations.getDocument(jobSchema, {
        _id: request.query.id,
      });
      return { status: 200, body: response };
    }
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.getJobs = async (request) => {
  try {
    const response = await operations.getJobDocuments(jobSchema, {});
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.filterJobs = async (request) => {
  try {
    const response = await operations.getJobsbyFilter(jobSchema, {
      keyw: request.body.role,
      location: request.body.location,
    });
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.filterJobsInSearch = async (request) => {
  try {
    const response = await operations.getJobsInSearch(jobSchema, {});
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.getJobDetails_search = async (request,res) => {
  try {
    const { title, location } = request.query;
    const averagesalary = await jobSchema.aggregate([
      {
        $match: {
          $and: [{ jobTitle: title }, { "location.city": location }],
        },
      },
      { $group: { _id: null, avg: { $avg: "$salary" } } },
    ]);

    console.log(`averagesalary${averagesalary}`);
    await jobSchema
      .aggregate([
        {
          $match: {
            $and: [{ jobTitle: title }, { "location.city": location }],
          },
        },
        {
          $group: {
            _id: "$companyId",
            name: { $first: "$companyName" },
            avg: { $avg: "$salary" },
          },
        },
      ])
      .limit(5)
      .sort({ avg: -1 })
      .then((top5com) => {
        let resultMap = {};
        top5com.forEach((each) => {
          resultMap[each._id] = each;
        });
        const keys = Object.keys(resultMap);
        console.log(keys);
        const resMap = [];
        sqlconnection.query(
          `select companyId, count(*) as count, AVG(rating) as avg from indeed.reviews where companyId IN (?) group by companyId;`,
          [keys],
          (err, result) => {
            console.log(result);
            if (err) {
              console.log(err);
              const message = err.message
                ? err.message
                : "Error while fetching details";
              const code = err.statusCode ? err.statusCode : 500;
              return { status: code, body: { message } };
            } else {
              result.forEach((each) => {
                const temp = {};
                temp.count = each.count;
                temp.rating = each.avg;
                temp.results = resultMap[each.companyId];
                resMap.push(temp);
              });
              console.log(resMap);
              console.log(`top 5 companies${resMap}`);
              const response = {
                averagesalary,
                top5companies: resMap,
              };
              console.log(response);
              res.send(response);
             // return { status: 200, body: response };
              // return { status: 200, body: resMap };
            }
          }
        );
        
      });
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
