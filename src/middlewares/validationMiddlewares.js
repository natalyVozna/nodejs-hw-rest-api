const Joi = require("joi");
const RequestError = require("../helpers/RequestError");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(RequestError(400, error.message));
    // next(ValidationError(JSON.stringify(error.details)));
  }

  next();
};

const patchContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .optional(),
    phone: Joi.string().optional(),
    favorite: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(RequestError(400, error.message));
    // next(ValidationError(JSON.stringify(error.details)));
  }

  next();
};

module.exports = {
  addContactValidation,
  patchContactValidation,
};
