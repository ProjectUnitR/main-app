const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const batchSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "classes"
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "faculties"
    }
  },
  { timestamps: true }
);

module.exports = model("batches", batchSchema);
