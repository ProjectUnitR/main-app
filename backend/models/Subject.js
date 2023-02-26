const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ["Practical", "Theory"]
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "branches"
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "faculties"
    },
    year: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("subjects", subjectSchema);
