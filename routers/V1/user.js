import express from 'express';
import {
  signUp,
  getAllUser,
  signIn,
} from '../../controller/user.controller.js';

const route = express.Router();

route.post('/signUp', signUp);
route.post('/singIn', signIn);
route.get('/', getAllUser);

export default route;
