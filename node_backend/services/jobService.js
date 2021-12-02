const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const jobSchema = require("../db/schema/job").createModel();
const operations = require("../db/operations");
const { request } = require("express");

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

//get job details
exports.getJobDetails = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getDocument(jobSchema, {
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
    let response = await operations.getJobDocuments(jobSchema, {});
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.filterJobs = async (request) => {
  try {
    let response = await operations.getJobsbyFilter(jobSchema, {
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
    let response = await operations.getJobsInSearch(jobSchema, {});
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.jobByCompanyId = async (request) => {
  try {
    let response = await operations.getAllDocumentsWithId(
      jobSchema,
      request.query.id,
      "companyId"
    );
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
