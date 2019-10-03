/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
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
      403,
      403,
      'Only users allowed to create an Article',
    );
  } else {
    const { id } = req.user;
    const checkUser = employees.find((user) => user.id === id);
    if (!checkUser) {
      return res.status(401).json({
        status: 401,
        message: 'Oops,you must provide your credentails',
      });
    }
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
    if (newArticle) {
      return res.status(201).json({
        status: 201,
        message: 'article successfully created',
        data: newArticle,
      });
    }
  }
};
const deleteArticle = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      401,
      401,
      'Only Article Author allowed to delete it!',
    );
  } else {
    const { id } = req.params;
    const { id: ownerId } = req.user;
    const checkArticle = articles.find((delArticle) => delArticle.articleId === parseInt(id, 10));
    if (!checkArticle) {
      res.status(404).json({
        status: 404,
        message: 'article not found',
      });
    } else {
      const article = articles.findIndex((delArticle) => delArticle.articleId === parseInt(id, 10) && delArticle.authorId === ownerId);
      if (article !== -1) {
        articles.splice(article, 1);
        res.status(200).json({
          status: 200,
          message: 'article successfully Deleted',
        });
      } else {
        res.status(401).json({
          status: 401,
          message: 'Only Article Author allowed to delete it!',
        });
      }
    }
  }
};

const viewArticles = async (req, res) => {
  const { id } = req.params;
  const checkArticle = articles.find((editArticle) => editArticle.id == id);
  if (!checkArticle) {
    res.status(404).json({
      status: 404,
      message: 'Nothing found',
    });
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
      403,
      403,
      'Only Article Author allowed to edit it!',
    );
  } else {
    const { id } = req.params;
    const { id: ownerId } = req.user;
    const upArticle = articles.find((editArticle) => editArticle.articleId == id);
    if (!upArticle) {
      res.status(404).json({
        status: 404,
        message: 'Article not found',
      });
    } else {
      const updateArticle = articles.find((editArticle) => editArticle.articleId == id && editArticle.authorId == ownerId);
      if (!updateArticle) {
        response.response(
          res,
          403,
          403,
          'Only Article Author allowed to edit it!',
        );
      } else {
        const UpdateData = Object.keys(req.body);
        UpdateData.forEach((data) => {
          updateArticle[data] = req.body[data];
        });
        res.status(200).json({
          status: 200,
          message: 'article successfully Edited',
          data: updateArticle,
        });
      }
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
      403,
      403,
      'Only users allowed to comment!',
    );
  } else {
    const { id: userId } = req.user;
    const { id } = req.params;
    const { comment } = req.body;
    const existArticle = await articles.findIndex((findArticle) => findArticle.articleId === parseInt(id, 10));
    if (existArticle !== -1) {
      const { createdOn, title, article } = articles[existArticle];
      const postComment = {
        commentId: comments.length + 1,
        articleId: parseInt(id, 10),
        authorId: userId,
        comment,
      };

      comments.push(postComment);
      if (postComment) {
        const result = {
          createdOn, title, article, comment,
        };
        res.status(201).json({
          status: 201,
          message: 'Comment Added',
          data: result,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'article Not Found ',
      });
    }
  }
};

const specificArticle = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      403,
      403,
      'Only users allowed!',
    );
  } else {
    const { id } = req.params;
    const existArticle = articles.filter(
      (specfarticles) => specfarticles.articleId === parseInt(id, 10),
    );
    if (existArticle.length > 0) {
      const fetchcomments = await comments.filter(
        (article) => article.articleId === parseInt(id, 10),
      );
      const {
        articleId, createdOn, title, article, authorId,
      } = existArticle[0];
      const data = {
        articleId,
        createdOn,
        title,
        article,
        authorId,
        comments: fetchcomments,
      };
      res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'article Not Found',
      });
    }
  }
};

const tagArticle = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    response.response(
      res,
      403,
      403,
      'Only users allowed!',
    );
  } else {
    const { article } = req.query;
    const filterArticles = articles.filter((item) => item.article.includes(`${article.trim()}`));
    if (filterArticles.length > 0) {
      res.status(200).json({
        status: 200,
        data: filterArticles,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'article Not Found',
      });
    }
  }
};

export default {
  createArticle, deleteArticle, viewArticles, editArticles, commentOnArticle, specificArticle, tagArticle,
};
