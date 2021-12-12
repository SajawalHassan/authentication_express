const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

require("dotenv").config();

// Initializing express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes middleware
app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);

// connecting to our database
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to db!")
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
