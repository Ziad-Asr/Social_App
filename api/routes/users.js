const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send(`Hey it is users route!`);
});

module.exports = router;

// In Jonous course he made two different things than here
// 1) he type router.route('/').get(..getFunc..).post(..PostFun..)
// && he type router.route('/:id').get(..getFunc..).post(..Patchfun..).delete(..deleteFunc..)
// 2) He put {functions} in {{Controllers}} directory
