/* eslint-disable eol-last */
import express from 'express';
import userToken from '../middlewares/checkToken';
import adminToken from '../middlewares/adminToken';
import flagController from '../controllers/flagController';

const router = express.Router();
router.get('/flags', userToken, adminToken, flagController.viewFlags);
router.post('/flags/:id', userToken, flagController.flagArticle);
router.delete('/flags/:id', userToken, adminToken, flagController.deleteFlagArticle);

export default router;