const router = require("express").Router();
const { addFaculty, getFaculties, getFacultiesByBranch, deleteFaculty } = require("../utils/Faculty");

router.post("/", async (req, res) => {
  await addFaculty(req.body, res);
});
router.get("/", async (req, res) => {
  if (req.query.branch) {
    await getFacultiesByBranch(req.query.branch, req.query.year, res);
  } else {
    await getFaculties(res);
  }
});
// router.get("/:id", async (req, res) => {
//   await getSubjectById(req.params.id, res);
// });

router.delete("/:id", async (req, res) => {
  await deleteFaculty(req.params.id, res);
});

module.exports = router;
