import Joi from 'joi';

module.exports = function validateIn(req) {
  const schema = {
    email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required(),
    password: Joi.string().required().min(6).max(50),
  };

  return Joi.validate(req, schema);
};
