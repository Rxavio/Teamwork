import flags from '../models/flag-data';
import employees from '../models/employee-data';
import articles from '../models/article-data';
import validateFlag from '../middlewares/validateFlag';
import response from '../helpers/response';

const viewFlags = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'success',
    data: flags,
  });
};
const flagArticle = async (req, res) => {
  const { error } = validateFlag(req.body);
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
      'Only users Allowed!',
    );
  } else {
    const { id: userId } = req.user;
    const checkUser = employees.find((user) => user.id === userId);
    if (!checkUser) return res.status(401).send('Oops,you must provide your credentails');
    const { firstName, lastName } = checkUser;
    const { id } = req.params;
    const findArticle = articles.find((checkArticle) => checkArticle.articleId == id);
    if (!findArticle) {
      return res.status(404).json({
        status: 404,
        error: 'Article not found.',
      });
    }
    const { articleId, title, article } = findArticle;
    const { flag, reason } = req.body;
    const flagBy = `${firstName} ${lastName}`;
    const addFag = {
      flagId: flags.length + 1,
      articleId,
      title,
      article,
      flag,
      reason,
      flagBy,
    };
    flags.push(addFag);
    return res.status(201).json({
      status: 201,
      message: 'Successfully Flagged',
      data: addFag,
    });
  }
};


export default {
  viewFlags,flagArticle
};
