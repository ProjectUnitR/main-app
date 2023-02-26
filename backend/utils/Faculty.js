const Branch = require("../models/Branch");
const Faculty = require("../models/Faculty");
const { success, error } = require("consola");

const addFaculty = async (facultyDetails, res) => {
  try {
    const branch = await Branch.findById(facultyDetails.branch);
    const faculty = await Faculty.create({
      ...facultyDetails,
      branch: branch._id
    });
    success({ message: `Faculty successfully created with ID: ${faculty._id}`, badge: true });
    res.status(201).json(faculty);
  } catch (err) {
    if (err.code === 11000) {
      error({ message: `[${err.code}] Batch with the title already exists`, badge: true });
    }
    // const errors = handleErrors(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getFaculties = async (res) => {
  try {
    const faculties = await Faculty.find().populate("branch");
    if (faculties.length > 0) {
      res.status(200).json(faculties);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getFacultiesByBranch = async (branchId, res) => {
  try {
    const branch = await Branch.findById(branchId);
    const faculties = await Faculty.find({
      branch: branch._id
    });
    if (faculties.length > 0) {
      res.status(200).json(faculties);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const deleteFaculty = async (facultyId, res) => {
  try {
    const faculty = await Faculty.findById(facultyId);
    if (faculty) {
      await Faculty.deleteOne({ _id: faculty._id });
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

module.exports = {
  addFaculty,
  getFaculties,
  getFacultiesByBranch,
  deleteFaculty
};
