import Joi from 'joi';

module.exports = function validateArticle(req) {
  const schema = {
    title: Joi.string().min(4).max(120).required(),
    article: Joi.string().min(50).required(),
  };

  return Joi.validate(req, schema);
};
