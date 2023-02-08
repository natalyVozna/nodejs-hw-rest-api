const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    next(new NotAuthorizedError("Please, provide a token"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = {
  authMiddleware,
};
