const { Nodejs32Error } = require("./errors");

const asyncWrapper = (controller) => {
  const fun = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fun;

  // return (req, res, next) => {
  //   controller(req, res).catch(next);
  // };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof Nodejs32Error) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
