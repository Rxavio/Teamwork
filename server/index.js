import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import employee from './routes/employee';
import response from './helpers/response';

dotenv.config();


const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', employee);

app.use('*', (req, res) => {
  response.response(res, 404, 'error', 'Wrong request', true);
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});

export default app;
