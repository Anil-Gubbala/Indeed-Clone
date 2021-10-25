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

const getDocumentByDetails = async (modelObject, details) => {
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

module.exports.getDocumentByDetails = getDocumentByDetails;
module.exports.saveDocuments = saveDocuments;
module.exports.getDocument = getDocument;
module.exports.updateField = updateField;
