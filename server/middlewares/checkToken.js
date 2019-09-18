/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function userToken(req, res, next) {
  const token = req.header('user_token');
  if (!token) return res.status(401).send('Access Denied.You Must Provide a Token.');
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
}
export default userToken;
