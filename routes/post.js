const router = require("express").Router();
const verify = require("../utils/verify");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "Random data you shouldn't access",
    },
  });
});

module.exports = router;
