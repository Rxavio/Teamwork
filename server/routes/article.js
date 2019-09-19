import express from 'express';
import userToken from '../middlewares/checkToken';
import articleController from '../controllers/articleController';

const router = express.Router();
router.post('/article', userToken, articleController.createArticle);
router.delete('/articles/:id', userToken, articleController.deleteArticle);

export default router;
