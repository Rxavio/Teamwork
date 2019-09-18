/* eslint-disable consistent-return */
import moment from 'moment';
import articles from '../models/article-data';
import validateArticle from '../middlewares/validateArticle';
import response from '../helpers/response';

const createArticle = async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return response.response(
      res,
      422,
      422,
      `${error.details[0].message}`,
      true,
    );
  }
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      401,
      'error', 'Administrator are not allowed to create Article',
      true,
    );
  } else {
    const {
      title, article,
    } = req.body;
    const newArticle = {
      id: articles.length + 1,
      createdOn: moment().format(),
      title,
      article,
    };
    articles.push(newArticle);

    return res.status(201).json({
      status: 201,
      message: 'article successfully created',
      data: newArticle,
    });
  }
};

export default { createArticle };
