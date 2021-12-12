const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token"); // Grabbing auth-token
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Decoding auth-token
    req.user = verified;
  } catch (err) {
    res.status(400).send(err);
  }

  next();
};
