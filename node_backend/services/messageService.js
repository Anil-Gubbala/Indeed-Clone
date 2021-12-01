const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const messageScehma = require("../db/schema/message").createModel();
const operations = require("../db/operations");
const jobApplicationSchema =
  require("../db/schema/jobApplication").createModel();
const { request } = require("express");
const mongoose = require("mongoose");

exports.saveMessage = async (request) => {
  try {
    let response = {};
    if (request.body.chatId == "")
      response = await operations.saveDocuments(messageScehma, request.body, {
        runValidators: false,
      });
    else {
      response = await operations.updateDocumentArrayAttribute(
        messageScehma,
        request.body.chatId,
        request.body.message
      );
    }
    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while saving details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

// GET CHAT MESSAGES
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

// exports.getMessages = async (request) => {
//   try {
//     if (request.query.id) {
//       let response = await jobApplicationSchema
//         .find({
//           $and: [
//             { userId: mongoose.Types.ObjectId("61765e2cac3f02c79a885221") },
//             { status: "Applied" },
//           ],
//         })
//         .populate("jobId");
//       // let response = await operations.getDocument(
//       //   messageScehma,
//       //   request.query.id
//       // );
//       return { status: 200, body: response };
//     }
//   } catch (err) {
//     const message = err.message ? err.message : "Error while fetching details";
//     const code = err.statusCode ? err.statusCode : 500;
//     return { status: code, body: { message } };
//   }
// };

//GET CHATS
exports.getChats = async (request) => {
  try {
    console.log(request.query);
    let response = await messageScehma
      .find({
        $or: [
          { employerId: mongoose.Types.ObjectId(request.query.id) },
          { seekerId: mongoose.Types.ObjectId(request.query.id) },
        ],
      })
      .populate("employerId")
      .populate("seekerId");

    return { status: 200, body: response };
  } catch (err) {
    const message = err.message ? err.message : "Error while fetching details";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};
