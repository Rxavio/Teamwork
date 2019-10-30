import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import dotenv from 'dotenv';
import validateUp from '../middlewares/validateSignup';
import response from '../helpers/response';

dotenv.config();
const { DATABASE_URL } = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect();

// sign up
const signUp = async (req, res) => {
  const { error } = validateUp(req.body);
  if (error) {
    return response.response(res, 422, 422, `${error.details[0].message}`, true);
  }
  const user = await client.query('SELECT * FROM users WHERE email=$1 ', [req.body.email]);
  if (user.rows.length > 0) {
    response.response(res, 409, 'error', 'User with that email already registered', true);
  } else {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);
    client.query('INSERT INTO users(first_name, last_name, email, password, gender, job_role, department,address,is_admin)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
      firstName,
      lastName,
      email,
      newpassword,
      gender, jobRole, department, address, 'false',
    ]);

    const checkUser = await client.query('SELECT * FROM users WHERE email=$1 ', [req.body.email]);
    const token = jwt.sign(
      { id: checkUser.rows[0].id, isAdmin: checkUser.rows[0].is_admin }, process.env.JWT_KEY,
    );
    const data = { token };
    return response.response(res, 201, 'User registered successfully', data, false);
  }
  return response;
};
export default { signUp };
