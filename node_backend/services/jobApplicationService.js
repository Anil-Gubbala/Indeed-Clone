const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const jobApplicationSchema =
  require("../db/schema/jobApplication").createModel();
const operations = require("../db/operations");
const { request } = require("express");

//save job Application details
exports.saveJobApplicationDetails = async (request) => {
  try {
    let response = {};
    if (!request.body.id)
      response = await operations.saveDocuments(
        jobApplicationSchema,
        request.body,
        {
          runValidators: false,
        }
      );
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while saving details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//GET JOB APPLICATION BY JOB ID
exports.getJobApplicationByJobId = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getAllDocumentsWithId(
        jobApplicationSchema,
        request.query.id,
        request.query.attr
      );
      return { status: 200, body: response };
    }
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
