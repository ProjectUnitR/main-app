const Batch = require("../models/Batch");
const Class = require("../models/Class");
const { success, error } = require("consola");

const addBatch = async (batchDetails, res) => {
  try {
    const classInfo = await Class.findById(batchDetails.class);
    const batch = await Batch.create({
      ...batchDetails,
      class: classInfo._id
    });
    success({ message: `Batch successfully created with ID: ${batch._id}`, badge: true });
    res.status(201).json(batch);
  } catch (err) {
    if (err.code === 11000) {
      error({ message: `[${err.code}] Batch with the title already exists`, badge: true });
    }
    // const errors = handleErrors(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getBatches = async (res) => {
  try {
    const batch = await Batch.find().populate("class");
    if (batch) {
      res.status(200).json(batch);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    // const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const getBatchesByClass = async (classId, res) => {
  try {
    const classInfo = await Class.findById(classId);
    const batches = await Batch.find({
      class: classInfo._id
    });
    if (batches) {
      res.status(200).json(batches);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    // const errors = handleErrors(err);
    res.status(400).json({ message: "Some error occurred" });
  }
};

const deleteBatch = async (id, res) => {
  try {
    const batch = await Batch.findById(id);
    if (batch) {
      await Batch.deleteOne({ _id: classInfo._id });
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Some error occurred while deleting the class" });
  }
};

module.exports = {
  getBatches,
  getBatchesByClass,
  addBatch,
  deleteBatch
};
