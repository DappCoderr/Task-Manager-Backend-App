import express from 'express';
import apiRoute from './routers/apiRouter.js';
import connectDB from './config/connectDB.js';

const app = express();

const PORT = 7777;

app.use(express.json())
app.use('/api', apiRoute);

app.listen(PORT, () => {
  console.log('Server started and listening on PORT: ', PORT);
  connectDB();
});
