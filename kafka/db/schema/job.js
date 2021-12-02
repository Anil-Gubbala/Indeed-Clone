const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    // get company name, location, reviews other details from company schema
    jobTitle: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    companyName: { type: String, required: true },
    role: { type: String },
    location: {
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    industry:{ type: String },
    street:{ type: String },
    country:{ type: String },
    salary: { type: String },
    type: { type: String },
    work: { type: String },
    why: { type: String },
    need:{ type: String },
    date: {type: Date},
  },
  { _id: false },
  { collection: "job" }
);

const createModel = function () {
  return mongoose.model("job", jobScehma);
};

module.exports.createModel = createModel;
