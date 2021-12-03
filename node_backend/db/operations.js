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

const getJobDocuments = async (modelObject, _id) => {
  try {
    return modelObject
      .find()
      .populate({
        path: "companyId",
        select: "-_id",
      })
      .lean();
  } catch (error) {
    console.log("Error while retreiving data by ID:" + error);
    throw new Error(error);
  }
};

const getAllDocumentsWithId = async (modelObject, id, attributeName) => {
  try {
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
    });
  } catch (error) {
    console.log("Error while retreiving data by details:" + error);
    throw new Error(error);
  }
};

const getDocuments = async (modelObject, details) => {
  try {
    return await modelObject.find({});
  } catch (error) {
    console.log("Error while retreiving data by details:" + error);
    throw new Error(error);
  }
};

const getJobsbyFilter = async (modelObject, details) => {
  try {
    var obj = modelObject
      .find()
      .populate({
        path: "companyId"
        //select: "-_id",
      })
      .lean();
      
    // console.log(obj.filter(x => x.role === ""));
     return obj;
    return await obj.find({
      $and: [
        {
          $or: [
            { "companyId.name": { $regex: new RegExp(details.keyw, "i") } },
            { "role": { $regex: new RegExp(details.keyw, "i") } },
          ],
        },
        { "location.city": { $regex: new RegExp(details.location, "i") } },
      ],
    });
  } catch (error) {
    console.log("Error while retreiving data by details:" + error);
    throw new Error(error);
  }
};

const getJobsInSearch = async (modelObject, details) => {
  try {
    return await modelObject.find({}, { role: 1, "location.city": 1,  _id: 0 });
  } catch (error) {
    console.log("Error while retreiving data by details:" + error);
    throw new Error(error);
  }
};

const updateDocumentArrayAttribute = async (modelObject, _id, message) => {
  try {
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
module.exports.getDocuments = getDocuments;
module.exports.getJobsbyFilter = getJobsbyFilter;
module.exports.getJobsInSearch = getJobsInSearch;
module.exports.getJobDocuments = getJobDocuments;
module.exports.updateDocumentArrayAttribute = updateDocumentArrayAttribute;
