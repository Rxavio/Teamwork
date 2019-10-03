import Joi from 'joi';

module.exports = function validateUp(req) {
  const schema = {
    firstName: Joi.string().required().min(4).max(50)
      .trim(),
    lastName: Joi.string().required().min(4).max(50)
      .trim(),
    email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required()
      .trim(),
    password: Joi.string().required().min(6).max(50)
      .trim(),
    gender: Joi.string().required().min(1).max(10)
      .trim(),
    jobRole: Joi.string().required().min(4).max(50)
      .trim(),
    department: Joi.string().required().min(2).max(50)
      .trim(),
    address: Joi.string().required().min(4).max(50)
      .trim(),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(req, schema);
};
