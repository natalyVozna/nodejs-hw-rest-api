const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/RequestError");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const registration = async (email, password) => {
  const checkUser = await User.findOne({ email });

  if (checkUser) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  console.log("user", user);

  if (!user) {
    throw RequestError(401, `Email or password is wrong`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `Email or password is wrong`);
  }

  const token = jwt.sign(
    {
      id: user._id,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { token, user };
};

const patchUserSubscription = async (userId, subscription) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription } }
  );
  if (!user) {
    throw RequestError(404, "Not Found");
  }

  return user;
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (_id, { tempUpload, originalname }) => {
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, filename);
  await Jimp.read(tempUpload)
    .then((img) => {
      return img
        .resize(200, 200, Jimp.RESIZE_BEZIER) // resize
        .write(tempUpload); // save
    })
    .catch((err) => {
      console.error(err);
    });
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  return avatarURL;
};

module.exports = {
  registration,
  login,
  patchUserSubscription,
  updateAvatar,
};
