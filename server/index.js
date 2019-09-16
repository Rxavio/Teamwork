/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import employee from './routes/employee';

dotenv.config();


const app = express();

const port = process.env.PORT || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', employee);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
