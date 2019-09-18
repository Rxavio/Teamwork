import express from 'express';
import userToken from '../middlewares/checkToken';
import articleController from '../controllers/articleController';

const router = express.Router();
router.post('/article', userToken, articleController.createArticle);

export default router;
