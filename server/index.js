/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import employee from './routes/employee';
import article from './routes/article';

dotenv.config();


const app = express();

const port = process.env.PORT || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', employee);
app.use('/api/v1', article);

app.use((req, res, next) => {
  const error = new Error('Method not allowed');
  error.status = 405;
  next(error);
});
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: error.status || 500, error: error.message });
  next();
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
