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
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
    status: { type: String },
  },
  { _id: false },
  { collection: "jobApplication" }
);

const createModel = function () {
  return mongoose.model("jobApplication", jobApplicationScehma);
};

module.exports.createModel = createModel;
