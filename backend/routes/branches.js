const router = require("express").Router();
const { addBranch, getBranches, getBranchById, deleteBranch } = require("../utils/Branch");

router.post("/", async (req, res) => {
  await addBranch(req.body.title, res);
});

router.get("/", async (req, res) => {
  await getBranches(res);
});

router.get("/:id", async (req, res) => {
  await getBranchById(req.params.id, res);
});

router.delete("/:id", async (req, res) => {
  console.log("Delete Request Received");
  await deleteBranch(req.params.id, res);
});

module.exports = router;
