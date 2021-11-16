const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobApplicationScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true },
    details: Object,
  },
  { _id: false },
  { collection: "jobApplication" }
);

const createModel = function () {
  return mongoose.model("jobApplication", jobApplicationScehma);
};

module.exports.createModel = createModel;
