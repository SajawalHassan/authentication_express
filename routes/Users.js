const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { validateRegistration } = require("../utils/validation");

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

module.exports = router;
