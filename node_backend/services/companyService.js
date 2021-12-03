const _ = require("lodash");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const companySchema = require("../db/schema/company").createModel();
const jobSchema = require("../db/schema/job").createModel();
const imageSchema = require("../db/schema/image").createModel();
const salaryScehma = require("../db/schema/salary").createModel();
const reviewSchema = require("../db/schema/review").createModel();
const operations = require("../db/operations");
const { request } = require("express");

// save company details
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

exports.saveSalaryDetails = async (request) => {
  try {
    // console.log(request.body.id);
    let response = {};
    if (!request.body.id)
      response = await operations.saveDocuments(salaryScehma, request.body, {
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
      const response = await operations.getDocument(companySchema, {
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

exports.getSalaryDetails = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getAllDocumentsWithId(
        salaryScehma,
        request.query.id,
        "companyId"
      );
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

//get companies for admins
exports.getAdminCompanies = async (request) => {
  try {
    let response = await companySchema.find();

    return { status: 200, body: response };
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

// get company details based on name and/or location
exports.getCompanyDetails_nameloc = async (request) => {
  try {
    console.log(request.query.name);
    console.log(request.query.location);
    const { name, location } = request.query;
    console.log(name);
    console.log(location);
    let response;
    if (name != "" && location != "") {
      response = await companySchema.find({
        $and: [{ name }, { location }],
      });
    } else if (name != "") {
      response = await companySchema.find({ $and: [{ name }] });
    } else if (location != "") {
      response = await companySchema.find({
        $and: [{ location }],
      });
    }
    console.log(response);
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
