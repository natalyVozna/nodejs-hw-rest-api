const path = require("path");
const { User } = require("../models/userModel");
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setApiKey(
  "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"
);

const {
  registration,
  login,
  patchUserSubscription,
  updateAvatar,
  verify,
  resendEmail,
} = require("../services/userService");

const registrationController = async (req, res) => {
  const { password, email } = req.body;
  const user = await registration(email, password);
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};
const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await verify(verificationToken);
  res.json({
    message: "Verification successful",
  });
};
const resendEmailController = async (req, res) => {
  const { email } = req.body;
  await resendEmail(email);
  res.json({
    message: "Verification email sent",
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
  const user = await patchUserSubscription(userId, subscription);
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatarController = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const avatarURL = await updateAvatar(_id, { tempUpload, originalname });
  res.json({
    avatarURL,
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

module.exports = {
  registrationController,
  verifyController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserController,
  updateAvatarController,
  resendEmailController,
};
