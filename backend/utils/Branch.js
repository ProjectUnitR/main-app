const Branch = require("../models/Branch");
const { success, error } = require("consola");

/**
 * @DESC Add a Branch
 */

const addBranch = async (title, res) => {
  try {
    const branch = await Branch.create({
      title: title
    });

    success({ message: `Branch successfully created with ID: ${branch._id}`, badge: true });
    res.status(201).json(branch);
  } catch (err) {
    if (err.code === 11000) {
      error({ message: `[${err.code}] Branch with the title already exists`, badge: true });
    }
    // const errors = handleErrors(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getBranches = async (res) => {
  try {
    const branches = await Branch.find();
    if (branches.length > 0) {
      res.status(200).json(branches);
    }
    res.status(404).send();
  } catch (err) {
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getBranchById = async (id, res) => {
  try {
    const branch = await Branch.findById(id);
    if (branch) {
      res.status(200).json(branch);
    }
    res.status(404).send();
  } catch (err) {
    res.status(400).json({ message: "Some error occurred" });
  }
};

const deleteBranch = async (id, res) => {
  Branch.findByIdAndRemove(id, function (err, docs) {
    if (!docs) {
      res.status(404).send();
    } else if (err) {
      console.log(err);
      res.status(400).json({ message: "Some error occurred" });
    } else {
      console.log("Removed Branch : ", docs);
      res.status(200).send();
    }
  });
};

module.exports = {
  addBranch,
  getBranches,
  getBranchById,
  deleteBranch
};
