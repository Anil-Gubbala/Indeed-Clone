const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const userSchema = require("../db/schema/user").createModel();
const operations = require("../db/operations");
const { request } = require("express");

exports.saveUserDetails = async (request) => {
  try {
    // console.log(request.body.id);
    let response = {};
    if (!request.body.id)
      response = await operations.saveDocuments(userSchema, request.body, {
        runValidators: false,
      });
    else
      response = await operations.updateField(
        userSchema,
        { id: request.body.id },
        request.body
      );
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message
      ? err.message
      : "Error while fetching credentials";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.getUserDetails = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getDocument(userSchema, {
        _id: request.query.id,
      });
      return { status: 200, body: response };
    }
    if (request.query.emailId) {
      let response = await operations.getDocumentByDetails(userSchema, {
        emailId: request.query.emailId,
        password: request.query.password,
        accountType: request.query.accountType,
      });
      return { status: 200, body: response };
    }
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
