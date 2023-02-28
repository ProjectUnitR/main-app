const router = require("express").Router();
const { userRegister, userLogin, userAuth, checkRole } = require("../utils/Auth");

// User registration Router
// checkRole(["admin"])
// userAuth

router.post("/register", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register/admin", async (req, res) => {
  await userRegister(req.body, "super-admin", res);
});

// User login Router
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});

// Profile router
router.get("/profile", userAuth, async (req, res) => {
  res.json("Hello, pro");
});

module.exports = router;
