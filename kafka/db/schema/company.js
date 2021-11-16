const mongoose = require("mongoose");

const { Schema } = mongoose;

const companyScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    details: Object,
    reviews: [{}],
    images: { type: Array },
  },
  { _id: false },
  { collection: "company" }
);

const createModel = function () {
  return mongoose.model("company", companyScehma);
};

module.exports.createModel = createModel;
