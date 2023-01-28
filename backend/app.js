const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = "";
mongoose.set("strictQuery", false);
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false
  },
  (err) => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Connected to the server");
    });
  }
);
