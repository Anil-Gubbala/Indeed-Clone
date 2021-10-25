const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    userId: { type: String, required: true },
    // details: { type: {} },
    details: { type: mongoose.Schema.Types.Mixed },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    details: { type: mongoose.Schema.Types.Mixed },
    jobs: { type: Array },
    reviews: { type: mongoose.Schema.Types.Mixed },
    images: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false },
  { collection: "company" }
);

const createModel = function () {
  return mongoose.model("company", companyScehma);
};

module.exports.createModel = createModel;
