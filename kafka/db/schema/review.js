const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    comapanyId: { type: String },
    userId: { type: String },
    date: { type: Date },
    upVotes: { type: Number },
    downVotes: { type: Number },
    rating: { type: Number },
    summary: { type: String },
    review: { type: String },
    pros: { type: String },
    cons: { type: String },
    approval: { type: Boolean },
    prep: { type: String },
  },
  { _id: false },
  { collection: "review" }
);

const createModel = function () {
  return mongoose.model("review", reviewScehma);
};

module.exports.createModel = createModel;
