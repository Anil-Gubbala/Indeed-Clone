const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    jobTitle: { type: String, required: true },
    companyId: mongoose.Schema.Types.ObjectId,
    details: [{
      role:{
        type: String,
        required: true
      },
      companyName:{
        type: String,
        required: true
      },
      rating:
      {
        type: Number,
        required: true
      },
      location:
      {
        type: String,
        required: true
      },
      salaryDetails:
      {
        type: Number,
        required: true
      },
      type:
      {
        type: String,
        required: true
      },
      what:
      {
        type: String,
        required: true
      },
      why:
      {
        type: String,
        required: true
      },
      need:
      {
        type: String,
        required: true
      },
      noOfReviews:
      {
        type: String,
        required: true
      }

    }],
    applications: [{}],
  },
  { _id: false },
  { collection: "job" }
);

const createModel = function () {
  return mongoose.model("job", jobScehma);
};

module.exports.createModel = createModel;
