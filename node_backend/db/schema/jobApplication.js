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
    userName:{ type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
    resume: { type: String, required: true },
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
