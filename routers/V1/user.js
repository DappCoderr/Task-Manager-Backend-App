import express from 'express';
import {getAllUser, getUserDetailsByEmail} from '../../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../../middleware/auth.mw.js';

const route = express.Router();

route.get('/', verifyToken, isAdmin, getAllUser);
route.get('/details', verifyToken, getUserDetailsByEmail);

export default route;
