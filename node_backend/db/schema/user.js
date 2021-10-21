const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    emailid: { type: String, required: true },
    password: { type: String, required: true },
  },
  { _id: false },
  { collection: "user" }
);

const createModel = function () {
  return mongoose.model("user", userScehma);
};

module.exports.createModel = createModel;
