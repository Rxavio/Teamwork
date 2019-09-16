import Joi from 'joi';

module.exports = function validateUp(req) {
  const schema = {
    firstName: Joi.string().required().min(4).max(50),
    lastName: Joi.string().required().min(4).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(50),
    gender: Joi.string().required().min(1).max(10),
    jobRole: Joi.string().required().min(4).max(50),
    department: Joi.string().required().min(2).max(50),
    address: Joi.string().required().min(4).max(50),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(req, schema);
};
