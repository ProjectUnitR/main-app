const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const classSchema = new Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "branches"
    },
    title: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    division: {
      type: String,
      required: true
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "faculties"
    }
  },
  { timestamps: true }
);

module.exports = model("classes", classSchema);
