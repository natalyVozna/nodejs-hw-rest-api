const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async (password, email) => {
  const user = new User({
    email,
    password,
  });

  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  console.log("user", user);

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );

  return { token, user };
};

module.exports = {
  registration,
  login,
};
