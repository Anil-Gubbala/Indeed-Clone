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
    details: { type: mongoose.Schema.Types.Mixed },
    applications: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false },
  { collection: "job" }
);

const createModel = function () {
  return mongoose.model("job", jobScehma);
};

module.exports.createModel = createModel;
