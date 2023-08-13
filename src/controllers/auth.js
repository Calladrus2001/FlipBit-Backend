const User = require("../models/User.js");

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error has occured",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({
      message: "User Logged In",
      data: { user, token },
    });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

const readUser = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "Profile",
      errors: [],
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error in fetching Profile",
      errors: error,
      data: {},
    });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("User Logged out");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Logging out: ", error);
  }
};

module.exports = {
  login,
  logout,
  createUser,
  readUser,
};
