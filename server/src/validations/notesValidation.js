const Joi = require('joi');
const { validateSchema } = require('../utils/validationFunction');

exports.checkNote = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    desc: Joi.string().min(5).required(),
    tag: Joi.string().optional(),
  });
  const validated = validateSchema(req.body, schema);
  if (validated) next();
};
