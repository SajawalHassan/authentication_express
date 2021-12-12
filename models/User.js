const mongoose = require("mongoose");

// Creating mongodb schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1021,
  },
});

module.exports = mongoose.model("Users", userSchema); // Putting mongo db schema into database as a model
