import Joi from 'joi';

module.exports = function validateComment(req) {
  const schema = {
    comment: Joi.string().required().min(2),
  };

  return Joi.validate(req, schema);
};
