const mongoose = require("mongoose");
const {doInsert, doExec} = require("../utils/doQuery")

const UserSchema = require("../db/schema/user").createModel();

const registerUser = (msg, callback) => {
  const { emailId, password, accountType } = msg.data;
  const userModel = new UserSchema({emailId, password, accountType});
  doInsert(userModel, callback);
};

const getPassword = (msg, callback) => {
  let { emailId } = msg.data;
  doExec(UserSchema.findOne({ emailId }, ["-appliedJobs","-savedJobs"]), callback);
};



module.exports = {
    registerUser,getPassword
};
