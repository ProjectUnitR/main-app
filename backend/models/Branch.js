const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = model("branches", branchSchema);
