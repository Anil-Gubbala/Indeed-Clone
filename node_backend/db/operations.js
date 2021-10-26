const mongoose = require("mongoose");

const saveDocuments = async (modelObject, data, options) => {
  try {
    let model = new modelObject(data);
    return await model.save(options);
  } catch (error) {
    console.log("Error while saving data:" + error);
    throw new Error(error);
  }
};

const updateField = async (modelObject, id, update) => {
  try {
    return await modelObject.findOneAndUpdate(id, update, {
      useFindAndModify: false,
    });
  } catch (error) {
    console.log("Error while updating data:" + error);
    throw new Error(error);
  }
};

const getDocument = async (modelObject, _id) => {
  try {
    return await modelObject.findById(_id);
  } catch (error) {
    console.log("Error while retreiving data by ID:" + error);
    throw new Error(error);
  }
};

const getAllDocumentsWithId = async (modelObject, id, attributeName) => {
  try {
    // let query={
    //   []
    // }
    return await modelObject.find({
      [attributeName]: mongoose.Types.ObjectId(id),
    });
  } catch (error) {
    console.log("Error while retreiving details by ID:" + error);
    throw new Error(error);
  }
};

const getUserDocumentByDetails = async (modelObject, details) => {
  try {
    return await modelObject.findOne({
      emailId: details.emailId,
      password: details.password,
      accountType: details.accountType,
    });
  } catch (error) {
    console.log("Error while retreiving data by details:" + error);
    throw new Error(error);
  }
};

const updateDocumentAttribute = async (modelObject, _id, message) => {
  try {
    console.log(_id);
    return await modelObject.findOneAndUpdate(
      { _id: _id },
      { $push: { message: message } }
    );
  } catch (error) {
    console.log("Error while updating data:" + error);
    throw new Error(error);
  }
};

module.exports.getUserDocumentByDetails = getUserDocumentByDetails;
module.exports.getAllDocumentsWithId = getAllDocumentsWithId;
module.exports.saveDocuments = saveDocuments;
module.exports.getDocument = getDocument;
module.exports.updateField = updateField;
module.exports.updateDocumentAttribute = updateDocumentAttribute;
