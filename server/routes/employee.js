import express from 'express';
import employeeController from '../controllers/employeeController';

const router = express.Router();
router.post('/auth/signup', employeeController.signUp);
// router.post('/auth/signin', employeeController.signIn);

export default router;
