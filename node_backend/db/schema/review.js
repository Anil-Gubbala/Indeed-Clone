const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    details: {},
  },
  { _id: false },
  { collection: "review" }
);

const createModel = function () {
  return mongoose.model("review", reviewScehma);
};

module.exports.createModel = createModel;
