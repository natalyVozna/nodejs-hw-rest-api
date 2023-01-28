// const { User } = require("../db/userModel");
const RequestError = require("../helpers/RequestError");
const { registration, login } = require("../services/userService");

const registrationController = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    await registration(password, email);
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const { token, user } = await login(email, password);
    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(RequestError(401, err.message));
    // res.status(401).json({ message: err.message, status: "fail" });
  }
};

module.exports = {
  registrationController,
  loginController,
};
