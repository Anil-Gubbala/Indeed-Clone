const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    imageUrl: { type: String },
    isVerified: { type: Number, default:0 },
  },
  { _id: false },
  { collection: "image" }
);

const createModel = function () {
  return mongoose.model("image", imageScehma);
};

module.exports.createModel = createModel;
