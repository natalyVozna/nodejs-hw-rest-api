const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
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

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(ValidationError(validationResult.error.details));
      // return res.status(400).json({ message: validationResult.error.details });
    }

    next();
  },

  patchContactValidation: (req, res, next) => {
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

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    next();
  },
};
