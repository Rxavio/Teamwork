import express from 'express';
import userToken from '../middlewares/checkToken';
import adminToken from '../middlewares/adminToken';
import flagController from '../controllers/flagController';

const router = express.Router();
router.get('/flags', userToken, adminToken, flagController.viewFlags);

export default router;