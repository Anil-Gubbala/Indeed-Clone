const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    jobTitle: { type: String, required: true },
    companyId: mongoose.Schema.Types.ObjectId,
    details: Object,
  },
  { _id: false },
  { collection: "job" }
);

const createModel = function () {
  return mongoose.model("job", jobScehma);
};

module.exports.createModel = createModel;
