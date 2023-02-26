const router = require("express").Router();
const { addClass, getClasses, getClassesByBranchAndYear, getClassById, deleteClass } = require("../utils/Class");

router.post("/", async (req, res) => {
  await addClass(req.body, res);
});

router.get("/", async (req, res) => {
  if (req.query.branch && req.query.year) {
    console.log(req.query.branch, req.query.year);
    await getClassesByBranchAndYear(req.query.branch, req.query.year, res);
  } else {
    await getClasses(res);
  }
});

router.get("/:id", async (req, res) => {
  await getClassById(req.params.id, res);
});

router.delete("/:id", async (req, res) => {
  await deleteClass(req.params.id, res);
});

module.exports = router;
