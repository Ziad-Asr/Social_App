const bcrypt = require("bcrypt");
const router = require("express").Router();

const User = require("../models/User");

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(12);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(`Account has been updated`);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only update your account");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json(`Account has been deleted`);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only delete your account");
  }
});

module.exports = router;

// In Jonous course he made two different things than here
// 1) he type router.route('/').get(..getFunc..).post(..PostFun..)
// && he type router.route('/:id').get(..getFunc..).post(..Patchfun..).delete(..deleteFunc..)
// 2) He put {functions} in {{Controllers}} directory
