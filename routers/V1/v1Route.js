import express from 'express';
import authRoute from './auth.js';
import userRoute from './user.js';
import taksRoute from './task.js';

const route = express.Router();

route.use('/auth', authRoute);
route.use('/users', userRoute);
route.use('/tasks', taksRoute);

export default route;
