const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageScehma = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: [
      {
        msg: { type: String },
        sentby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        time: { type: Date },
      },
    ],
  },
  { _id: false },
  { collection: "message" }
);

const createModel = function () {
  return mongoose.model("message", messageScehma);
};

module.exports.createModel = createModel;
