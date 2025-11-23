import express from 'express';
import authRoute from './auth.js';
import userRoute from './user.js'
import taksRoute from './task.js'

const route = express.Router();

route.use('/auth', authRoute);
route.use('/user', userRoute);
route.use('/task', taksRoute)

export default route;
