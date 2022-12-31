//models
const mongoose = require("mongoose");

// user schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  cell: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  password: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
