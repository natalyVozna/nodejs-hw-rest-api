const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/RequestError");
const { User } = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");

    console.log("token", bearer === "Bearer");
    console.log("token2", jwt.verify(token, process.env.JWT_SECRET));
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    console.log("verif", user, id);

    if (!user || !user.token || user.token !== token) {
      throw RequestError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (err) {
    if (!err.status) {
      err.status = 401;
      err.message = "Not authorized";
    }
    next(err);
  }
};

module.exports = { authenticate };
