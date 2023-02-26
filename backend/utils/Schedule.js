const Class = require("../models/Class");
const Schedule = require("../models/Schedule");
const { success } = require("consola");
const { populate } = require("../models/Class");

const createSchedule = async (scheduleDetails, res) => {
  try {
    const schedule = await Schedule.create({
      ...scheduleDetails
    });
    success({ message: `Schedule successfully created with ID: ${schedule._id}`, badge: true });
    res.status(201).json(schedule);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while creating a schedule" });
  }
};

const getScheduleByClass = async (classId, res) => {
  try {
    const classInfo = await Class.findById(classId);
    if (classInfo) {
      const schedule = await Schedule.find({
        class: classInfo._id
      })
        .sort({ createdAt: -1 })
        .populate("class")
        .populate([
          {
            path: "monday tuesday wednesday thursday friday saturday",
            populate: {
              path: "lectures.subject practicals.subject practicals.batch "
            }
          },
          {
            path: "monday tuesday wednesday thursday friday saturday",
            populate: {
              path: "lectures",
              populate: {
                path: "subject",
                populate: "faculty"
              }
            }
          }
        ]);
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while creating a schedule" });
  }
};

module.exports = {
  createSchedule,
  getScheduleByClass
};
