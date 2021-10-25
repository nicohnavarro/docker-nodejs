const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });
    if (!userFound)
      res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    const isValid = await bcrypt.compare(password, userFound.password);
    if (isValid) {
      req.session.user = userFound;
      res.status(200).json({
        status: "success",
        message: "Login Success",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Incorrect password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
};
