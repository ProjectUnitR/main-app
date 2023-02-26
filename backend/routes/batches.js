const router = require("express").Router();
const { getBatches, getBatchesByClass, addBatch, deleteBatch } = require("../utils/Batch");

router.post("/", async (req, res) => {
  await addBatch(req.body, res);
});

router.get("/", async (req, res) => {
  if (req.query.class) {
    await getBatchesByClass(req.query.class, res);
  } else {
    await getBatches(res);
  }
});

router.delete("/:id", async (req, res) => {
  await deleteBatch(req.params.id, res);
});

module.exports = router;
