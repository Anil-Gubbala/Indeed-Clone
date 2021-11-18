const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    comapanyId: { type: String },
    jobTitle: { type: String },
    jobLocation: { type: String },
    pay: { type: Number },
    userId: { type: String },
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
