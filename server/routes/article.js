import express from 'express';
import userToken from '../middlewares/checkToken';
import articleController from '../controllers/articleController';

const router = express.Router();
router.post('/article', userToken, articleController.createArticle);
router.delete('/articles/:id', userToken, articleController.deleteArticle);
router.patch('/articles/:id', userToken, articleController.editArticles);
router.get('/feeds', userToken, articleController.viewArticles);
router.post('/articles/:id/comments', userToken, articleController.commentOnArticle);
router.get('/articles/:id', userToken, articleController.specificArticle);

export default router;
