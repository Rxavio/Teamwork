/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import moment from 'moment';
import _ from 'lodash';
import articles from '../models/article-data';
import employees from '../models/employee-data';
import comments from '../models/comment-data';
import validateArticle from '../middlewares/validateArticle';
import validateComment from '../middlewares/commentValidate';
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
    // eslint-disable-next-line no-shadow
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
      'Only Article Author allowed to delete it!',
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
    const sortArticles = _.sortBy(articles).reverse();
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: sortArticles,
    });
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
    const article = articles.find((editArticle) => editArticle.articleId == id);
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
const commentOnArticle = async (req, res) => {
  const { error } = validateComment(req.body);
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
      'Oops,Only users allowed!',
      true,
    );
  } else {
    const { id: userId } = req.user;
    const checkUser = employees.find((user) => user.id === userId);
    if (!checkUser) return res.status(400).send('Oops,you must provide your credentails');
    const { firstName, lastName } = checkUser;
    const { id } = req.params;
    const findArticle = articles.find((checkArticle) => checkArticle.articleId == id);
    if (!findArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article not found.',
      });
    }
    const { title, article } = findArticle;
    const { comment } = req.body;
    const commentBy = `${firstName} ${lastName}`;
    const addComment = {
      commentId: comments.length + 1,
      createdOn: moment().format(),
      title,
      article,
      comment,
      commentBy,
    };
    comments.push(addComment);
    return res.status(201).json({
      status: 201,
      message: 'relevant-success-message',
      data: addComment,
    });
  }
};

export default {
  createArticle, deleteArticle, viewArticles, editArticles, commentOnArticle,
};
