const cors = require("cors");
const express = require("express");
const { connect, set } = require("mongoose");
const { success, error } = require("consola");
const passport = require("passport");
const { DB, PORT } = require("./config/index");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "*"
  })
);

require("./middlewares/passport")(passport);

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

// User Router Middleware
app.use("/api/user", require("./routes/users"));
app.use("/api/branch", require("./routes/branches"));
app.use("/api/class", require("./routes/classes"));
app.use("/api/batch", require("./routes/batches"));
app.use("/api/subject", require("./routes/subjects"));
app.use("/api/schedule", require("./routes/schedules"));
app.use("/api/faculty", require("./routes/faculties"));

const startApp = async () => {
  try {
    set("strictQuery", false);
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    });
    success({ message: `Connected to the Database ${DB}`, badge: true });

    app.listen(PORT, () => {
      success({ message: `Server running on PORT ${PORT}`, badge: true });
    });
  } catch (err) {
    error({ message: `Unable to connect to the Database \n${err}`, badge: true });
  }
};

startApp();
