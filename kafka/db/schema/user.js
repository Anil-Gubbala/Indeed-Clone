const mongoose = require("mongoose");

const { Schema } = mongoose;

const userScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String },
    location: { type: String },
    contact: { type: String },
    resumeLink: { type: String },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
  },
  { _id: false },
  { collection: "user" }
);

const createModel = function () {
  return mongoose.model("user", userScehma);
};

module.exports.createModel = createModel;
