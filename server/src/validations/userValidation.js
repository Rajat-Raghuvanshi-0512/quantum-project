const Joi = require('joi');
const { validateSchema } = require('../utils/validationFunction');

exports.checkSignUp = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  });
  const validated = validateSchema(req.body, schema);
  if (validated) next();
};

exports.checkLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
  });
  const validated = validateSchema(req.body, schema);
  if (validated) next();
};
