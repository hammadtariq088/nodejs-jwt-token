require("dotenv").config();
const express = require("express");
// const errorHandler = require("../../middleware/error");
const authHandler = require("../../middleware/auth");
const destroyHandler = require("../../middleware/destroy");
const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");

const router = express.Router();

// All users
router.get("/", authHandler, async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

// Specific user
router.get("/:userId", authHandler, async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });

  res.status(200).send(user);
});

// Update user
router.put("/:userId", authHandler, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: req.params.userId,
    },
    {
      name: req.body.name,
      email: req.body.email,
      cnic: req.body.cnic,
      gender: req.body.gender,
      cell: req.body.cell,
      dob: req.body.dob,
      password: req.body.password,
    }
  );
  const { error } = createUserSchema(updatedUser);
  if (error) {
    return res.status(400).send({ message: error.message });
  }
  let user = new User(updatedUser);
  user = await user.save();
  res.status(200).send(user);
});

// Delete user
router.delete("/:userId", authHandler, async (req, res) => {
  const user = await User.findByIdAndDelete({
    _id: req.params.userId,
  });

  res.status(200).send(user);
});

// Signup user
router.post("/signup", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.message });
  }
  let user = new User(payload);

  user = await user.save();
  res.status(200).send(user);
});

// Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const userPass = req.body.password;
  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== userPass) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    name: user.name,
    email: user.email,
    password: user.password,
    id: user._id,
  });

  res.status(200).send({ message: "success", token });
});

router.get("/logout", destroyHandler, (req, res) => {
  res.status(200).send({ message: "destroyed" });
});

module.exports = router;
