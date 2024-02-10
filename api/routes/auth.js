const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Hey this is auth router!");
});

module.exports = router;
