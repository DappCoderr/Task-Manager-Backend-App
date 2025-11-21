import express from 'express';
import apiRoute from './routers/apiRouter';
import connectDB from './config/connectDB';

const app = express();

const PORT = 7777;

app.use('/api', apiRoute);

app.listen(PORT, () => {
  console.log('Server started and listening on PORT: ', PORT);
  connectDB();
  console.log('Connected to DB');
});
