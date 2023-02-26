const Class = require("../models/Class");
const Branch = require("../models/Branch");
const Faculty = require("../models/Faculty");
const { success, error } = require("consola");
const mongoose = require("mongoose");

const addClass = async (classDetails, res) => {
  try {
    const branch = await Branch.findById(classDetails.branch);
    const faculty = await Branch.findById(classDetails.faculty);
    const classExists = await Class.findOne({
      branch: branch._id,
      faculty: faculty._id,
      year: classDetails.year,
      division: classDetails.division
    });
    if (classExists) {
      res.status(200).json({ message: "Class already exists" });
    } else {
      const newClass = await Class.create({
        branch: branch._id,
        year: classDetails.year,
        division: classDetails.division,
        title: `${classDetails.year}-${classDetails.division}`
      });
      success({ message: `Class successfully created with ID: ${branch._id}`, badge: true });
      res.status(201).json(newClass);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while creating a class" });
  }
};

const getClasses = async (res) => {
  try {
    const classes = await Class.find().populate("branch");
    res.status(200).json(classes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while fetching the classes" });
  }
};

const getClassById = async (id, res) => {
  try {
    const classInfo = await Class.findById(id);
    if (classInfo) {
      res.status(200).json(classInfo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while fetching the classes" });
  }
};

const getClassesByBranchAndYear = async (branchId, year, res) => {
  try {
    const branch = await Branch.findById(branchId);
    const classInfo = await Class.find({
      branch: branch._id,
      year: year
    });
    if (classInfo) {
      res.status(200).json(classInfo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while fetching the classes" });
  }
};

const deleteClass = async (id, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const classInfo = await Class.findById(id);
      if (classInfo) {
        await Class.deleteOne({ _id: classInfo._id });
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
  addClass,
  getClasses,
  getClassById,
  getClassesByBranchAndYear,
  deleteClass
};
