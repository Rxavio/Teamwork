/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import moment from 'moment';
import articles from '../models/article-data';
import employees from '../models/employee-data';
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
      'Only users allowed to create an Article',
      true,
    );
  } else {
    const { id } = req.user;
    const checkUser = employees.find((user) => user.id === id);
    if (!checkUser) return res.status(400).send('Oops,you must provide your credentails');
    const { id: authorId, firstName, lastName } = checkUser;
    const {
      title, article,
    } = req.body;
    const authorName = `${firstName} ${lastName}`;
    const newArticle = {
      articleId: articles.length + 1,
      createdOn: moment().format(),
      title,
      article,
      authorId,
      authorName,
    };
    articles.push(newArticle);
    const { authorId: _, ...omitData } = newArticle;
    return res.status(201).json({
      status: 201,
      message: 'article successfully created',
      data: { ...omitData },
      // data: newArticle,
    });
  }
};

const deleteArticle = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      401,
      'Only Article Author allowed to delete it! ',
      true,
    );
  } else {
    const { id } = req.params;
    const article = articles.findIndex((delArticle) => delArticle.articleId === parseInt(id, 10));
    if (article !== -1) {
      articles.splice(article, 1);
      res.status(200).json({
        status: 200,
        message: 'article successfully Deleted',
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'article not found',
      });
    }
  }
};

const viewArticles = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      401,
      'Oops,Only users allowed!',
      true,
    );
  } else {
    const data = [];
    let j = 0;
    for (let i = articles.length - 1; i >= 0; i -= 1) {
      data[j] = articles[i];
      j += 1;
    }
    response.response(
      res,
      200,
      'success',
      data,
      false,
    );
  }
};

const editArticles = async (req, res) => {
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
      401,
      'Only Article Author allowed to edit it!',
      true,
    );
  } else {
    const { id } = req.params;
    const article = articles.find((editArtice) => editArtice.articleId == id);
    if (article) {
      const UpdateData = Object.keys(req.body);
      UpdateData.forEach((data) => {
        article[data] = req.body[data];
      });
      res.status(200).json({
        status: 200,
        message: 'article successfully Edited',
        data: article,
      });
    } else {
      response.response(res, 404, 404, 'Article you want to edit Does not Exist');
    }
  }
};

export default {
  createArticle, deleteArticle, viewArticles, editArticles,
};
