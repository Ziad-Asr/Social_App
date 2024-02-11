const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// // Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    !user &&
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });

    const validPassword = await bcrypt.compare(password, user.password);

    !validPassword &&
      res.status(404).json({
        status: "fail",
        message: "Wrong password",
      });

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

module.exports = router;
