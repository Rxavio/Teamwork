import bcrypt from 'bcryptjs';
import employees from '../models/employee-data';
import validateUp from '../middlewares/validateSignup';
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
  if (existUser) return res.status(401).send('User already registered.');
  const {
    firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
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
    isAdmin,
  };
  const salt = await bcrypt.genSalt(10);
  addUser.password = await bcrypt.hash(addUser.password, salt);
  employees.push(addUser);
  // exclude password to the output user credentials
  const { password: _, ...omitpUser } = addUser;
  return res.status(201).json({
    status: 201,
    message: 'User Created Successfully',
    data: { ...omitpUser },
  });
};

export default { signUp };
