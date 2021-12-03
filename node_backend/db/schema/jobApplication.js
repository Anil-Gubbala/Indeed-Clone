const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobApplicationScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "job" },
    resume: { type: String },
    coverLetter: { type: String },
    status: { type: String },
  },
  { _id: false },
  { collection: "jobApplication" }
);

const createModel = function () {
  return mongoose.model("jobApplication", jobApplicationScehma);
};

module.exports.createModel = createModel;
