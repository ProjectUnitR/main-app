const router = require("express").Router();
const { addSubject, getSubjects, getSubjectById, getSubjectByBranchAndYear, deleteSubject } = require("../utils/Subject");

router.post("/", async (req, res) => {
  await addSubject(req.body, res);
});
router.get("/", async (req, res) => {
  if (req.query.branch && req.query.year) {
    await getSubjectByBranchAndYear(req.query.branch, req.query.year, res);
  } else {
    await getSubjects(res);
  }
});
router.get("/:id", async (req, res) => {
  await getSubjectById(req.params.id, res);
});

router.delete("/:id", async (req, res) => {
  await deleteSubject(req.params.id, res);
});

module.exports = router;
