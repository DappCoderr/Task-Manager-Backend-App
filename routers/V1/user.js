import express from 'express';
import {
  getAllUser,
  getUserDetailsByEmail,
} from '../../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../../middlewares/auth.mw.js';
import { signUp } from '../../controllers/auth.controller.js';

const route = express.Router();

route.get('/', verifyToken, isAdmin, getAllUser);
route.post('/signup', signUp);
route.get('/me', verifyToken, getUserDetailsByEmail);

export default route;
