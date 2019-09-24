import Joi from 'joi';

module.exports = function validateFlag(flag) {
  const schema = {
    flag: Joi.boolean(),
    reason: Joi.string().min(6).required(),
  };

  return Joi.validate(flag, schema);
};
