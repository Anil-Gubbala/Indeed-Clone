const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const messageScehma = require("../db/schema/message").createModel();
const operations = require("../db/operations");
const { request } = require("express");

exports.saveMessage = async (request) => {
  try {
    let response = {};
    if (!request.body.chatId)
      response = await operations.saveDocuments(messageScehma, request.body, {
        runValidators: false,
      });
    else {
      response = await operations.updateDocumentAttribute(
        messageScehma,
        request.body.chatId,
        request.body.message
        // {
        //   runValidators: false,
        // }
      );
    }
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while saving details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//GET CHAT MESSAGES
exports.getMessages = async (request) => {
  try {
    if (request.query.id) {
      let response = await operations.getAllDocumentsWithId(
        messageScehma,
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
