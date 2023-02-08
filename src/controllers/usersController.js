const { User } = require("../models/userModel");
const {
  registration,
  login,
  patchUserSubscription,
} = require("../services/userService");

const registrationController = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await registration(email, password);
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const loginController = async (req, res) => {
  const { password, email } = req.body;
  const { token, user } = await login(email, password);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};
const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};
const updateUserController = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;
  console.log("req.body", req.body, req.user);
  const user = await patchUserSubscription(userId, subscription);
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserController,
};
