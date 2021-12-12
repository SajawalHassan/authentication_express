const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegistration, validateLogin } = require("../utils/validation");

router.post("/register", async (req, res) => {
  // Validating data
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).send(`${error.details[0].message}!`);
  }

  // Checking if the email already exits
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists!");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creating new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validating data
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(`${error.details[0].message}!`);
  }

  // Checking if the email exists
  const userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail) return res.status(400).send("Invalid email or password");

  // Checking if it's the correct password
  const correctPassword = bcrypt.compare(req.body.password, userEmail.password);
  if (!correctPassword) {
    res.status(400).send("Invalid email or password!");
  }

  // Creating a token
  const token = jwt.sign({ _id: userEmail._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
