const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    comapanyName: { type: String },
    isWorking: { type: String },
    endDate: { type: Date },
    jobTitle: { type: String },
    jobLocation: { type: String },
    category: { type: String },
    pay: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    experience: { type: String },
    benefits: { type: Array },
  },
  { _id: false },
  { collection: "salary" }
);

const createModel = function () {
  return mongoose.model("salary", salaryScehma);
};

module.exports.createModel = createModel;
