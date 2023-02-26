const router = require("express").Router();
const { createSchedule, getScheduleByClass } = require("../utils/Schedule");

router.post("/", async (req, res) => {
  await createSchedule(req.body, res);
});

router.get("/:id", async (req, res) => {
  await getScheduleByClass(req.params.id, res);
});

module.exports = router;
