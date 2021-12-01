const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const companySchema = require("../db/schema/company").createModel();
const jobSchema = require("../db/schema/job").createModel();
const imageSchema = require("../db/schema/image").createModel();
const operations = require("../db/operations");
const { request } = require("express");

//save company details
exports.saveCompanyDetails = async (request) => {
  try {
    // console.log(request.body.id);
    let response = {};
    if (!request.body.id)
      response = await operations.saveDocuments(companySchema, request.body, {
        runValidators: false,
      });
    else
      response = await operations.updateField(
        companySchema,
        { id: request.body.id },
        request.body
      );
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while saving details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//get company details
exports.getCompanyDetails = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getDocument(companySchema, {
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

//get company Photos
exports.getCompanyPhotos = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getAllDocumentsWithId(
        imageSchema,
        request.query.id,
        request.query.attributeName
      );

      return { status: 200, body: response };
    }
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//post company Photos
exports.postCompanyPhotos = async (request) => {
  try {
    response = await operations.saveDocuments(imageSchema, request.body, {
      runValidators: false,
    });

    return { status: 200, body: response };
  } catch (err) {
    console.log(err);
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
