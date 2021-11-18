const mongoose = require("mongoose");

const { Schema } = mongoose;

const companyScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    name: { type: String },
    website: { type: String },
    headquaters: { type: String },
    companySize: { type: Number },
    companyType: { type: String },
    about: { type: String },
    ceo: { type: String },
    founded: { type: Date },
    revenue: { type: String },
    industry: { type: String },
    description: { type: String },
    mission: { type: String },
    culture: { type: String },
    values: { type: String },
    image: { type: String },
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
    //instead use comple review
  },
  { _id: false },
  { collection: "company" }
);

const createModel = function () {
  return mongoose.model("company", companyScehma);
};

module.exports.createModel = createModel;
