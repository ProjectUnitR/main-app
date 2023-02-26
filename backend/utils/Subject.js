const Subject = require("../models/Subject");
const Branch = require("../models/Branch");
const Faculty = require("../models/Faculty");
const { success } = require("consola");
const mongoose = require("mongoose");

const addSubject = async (subjectDetails, res) => {
  try {
    const branch = await Branch.findById(subjectDetails.branch);
    const faculty = await Faculty.findById(subjectDetails.faculty);
    const subject = await Subject.create({
      ...subjectDetails,
      branch: branch._id,
      faculty: faculty._id
    });
    success({ message: `Subject successfully created with ID: ${subject._id}`, badge: true });
    res.status(201).json(subject);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while adding a subject" });
  }
};

const getSubjects = async (res) => {
  try {
    const subjects = await Subject.find()
      .populate([
        {
          path: "faculty branch"
        }
      ])
      .sort({ updatedAt: -1 });
    if (subjects.length > 0) {
      res.status(200).json(subjects);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getSubjectById = async (id, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const subject = await Subject.findById(id);
      if (subject) {
        res.status(200).json(subject);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getSubjectByBranchAndYear = async (id, year, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const branch = await Branch.findById(id);
      if (branch != null) {
        const subject = await Subject.find({
          branch: branch._id,
          year: year
        }).populate("branch");
        if (subject) {
          res.status(200).json(subject);
        } else {
          res.status(404).send();
        }
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const deleteSubject = async (id, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const subject = await Subject.findById(id);
      if (subject) {
        await Subject.deleteOne({ _id: subject._id });
        res.status(200).send();
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while deleting the class" });
  }
};

module.exports = {
  addSubject,
  getSubjects,
  getSubjectById,
  getSubjectByBranchAndYear,
  deleteSubject
};
