const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const userSchema = require("../db/schema/user").createModel();
const operations = require("../db/operations");
const { request } = require("express");

exports.saveUserDetails = async (request) => {
  try {
    let response = {};
    if (!request.body._id)
      response = await operations.saveDocuments(userSchema, request.body, {
        runValidators: false,
      });
    else
      response = await operations.updateField(
        userSchema,
        { _id: request.body._id },
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
