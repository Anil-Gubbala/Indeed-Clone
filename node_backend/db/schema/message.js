const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    employerId: mongoose.Schema.Types.ObjectId,
    seekerId: mongoose.Schema.Types.ObjectId,
    message: Array,
  },
  { _id: false },
  { collection: "message" }
);

const createModel = function () {
  return mongoose.model("message", messageScehma);
};

module.exports.createModel = createModel;
