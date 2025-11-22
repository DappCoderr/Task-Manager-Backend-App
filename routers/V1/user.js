import express from 'express';
import {
  signUp,
  getAllUser,
  signIn,
  getUserDetailsById,
} from '../../controller/user.controller.js';
import { isAdmin, verifyToken } from '../../middleware/auth.mw.js';

const route = express.Router();

route.post('/signUp', signUp);
route.post('/singIn', signIn);

route.get('/', verifyToken, isAdmin, getAllUser);
route.get('/details', verifyToken, getUserDetailsById);

export default route;
