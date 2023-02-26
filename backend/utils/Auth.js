const User = require("../models/User");
const { success, error } = require("consola");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");

/**
 * @DESC To register the user
 */

const userRegister = async (userDetails, role, res) => {
  const { username, password } = userDetails;
  try {
    const user = await User.create({
      ...userDetails,
      role
    });
    success({ message: `User successfully created with ID: ${user._id}`, badge: true });
    res.status(201).json({ userId: user._id });
  } catch (err) {
    if (err.code === 11000) {
      error({ message: `[${err.code}] User with the username already exists`, badge: true });
    }
    // const errors = handleErrors(err);
    res.status(400).json({ message: "User with the username already exists" });
    // res.status(400).send(err);
  }
};

/**
 * @DESC To login the user
 */

const userLogin = async (userCreds, res) => {
  const { username, password } = userCreds;
  try {
    const user = await User.findOne({ username }).populate("class");
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ userId: user._id, role: user.role, username: user.username, class: user.class._id }, SECRET, { expiresIn: 3 * 24 * 60 * 60 });
        success({ message: `User logged in with token: ${token}`, badge: true });
        res.status(200).json({ success: true, token: token });
      } else {
        throw Error("Incorrect username or password");
      }
    } else {
      throw Error("Incorrect username or password");
    }
  } catch (err) {
    error(err.message);
    res.status(200).json({ success: false, message: err.message });
  }
};

/**
 * @DESC Passport middleware
 */

const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Role check
 */

const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.status(401).send();
  }
};

module.exports = {
  userAuth,
  userRegister,
  userLogin,
  checkRole
};
