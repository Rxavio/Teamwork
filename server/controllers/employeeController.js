/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import employees from '../models/employee-data';
import validateUp from '../middlewares/validateSignup';
import validateIn from '../middlewares/validateSignin';
import response from '../helpers/response';
// sign up
const signUp = async (req, res) => {
  const { error } = validateUp(req.body);
  if (error) {
    return response.response(
      res,
      422,
      422,
      `${error.details[0].message}`,
      true,
    );
  }
  const existUser = employees.find((user) => user.email === req.body.email);
  if (existUser) {
    return res.status(409).json({
      status: 409,
      message: 'User Account already Exist.',
    });
  }

  let admin = 'false';
  if (req.body.email === process.env.Administrator) {
    admin = 'true';
  }
  const {
    firstName, lastName, email, password, gender, jobRole, department, address,
  } = req.body;

  const addUser = {
    id: employees.length + 1,
    firstName,
    lastName,
    email,
    password,
    gender,
    jobRole,
    department,
    address,
    isAdmin: admin,
  };
  const salt = await bcrypt.genSalt(10);
  addUser.password = await bcrypt.hash(addUser.password, salt);
  employees.push(addUser);
  const token = jwt.sign({ id: addUser.id, isAdmin: addUser.isAdmin }, process.env.JWT_KEY);
  if (addUser) {
    const result = {
      firstName, lastName, email, gender, jobRole, department, address,
    };
    return res.status(201).json({
      user_token: token,
      status: 201,
      message: 'User Created Successfully',
      data: result,
    });
  }
};
// Sign in
const signIn = async (req, res) => {
  const { error } = validateIn(req.body);
  if (error) {
    return response.response(
      res,
      422,
      422,
      `${error.details[0].message}`,
      true,
    );
  }
  const checkUser = employees.find((user) => user.email === req.body.email);
  if (!checkUser) {
    return res.status(401).json({
      status: 401,
      message: 'Email is not exist',
    });
  }
  const comparePass = await bcrypt.compare(req.body.password, checkUser.password);
  if (!comparePass) {
    return res.status(401).json({
      status: 401,
      message: 'Password is incorrect',
    });
  }
  const token = jwt.sign({ id: checkUser.id, isAdmin: checkUser.isAdmin }, process.env.JWT_KEY);
  return res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    user_token: token,

  });
};

export default { signUp, signIn };
