const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const lectureSchema = new Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subjects"
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batches"
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const practicalSchema = new Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subjects"
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batches"
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const breakSchema = new Schema(
  {
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  },
  { _id: false }
);

const scheduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "classes"
    },
    monday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    },
    tuesday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    },
    wednesday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    },
    thursday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    },
    friday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    },
    saturday: {
      lectures: [lectureSchema],
      practicals: [practicalSchema],
      lunchBreak: breakSchema,
      shortBreak: breakSchema
    }
  },
  { timestamps: true }
);

module.exports = model("schedules", scheduleSchema);
