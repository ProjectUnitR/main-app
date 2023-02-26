const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const facultySchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "branches"
    }
  },
  { timestamps: true }
);

module.exports = model("faculties", facultySchema);
