const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [6, "Minimum username length is 6 characters"],
      validate: [(value) => {}, "Please enter a valid username"]
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"]
    },
    role: {
      type: String,
      default: "user",
      enum: ["super-admin", "user"]
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes"
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model("users", userSchema);
