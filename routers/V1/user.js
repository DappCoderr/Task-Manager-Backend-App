import express from 'express';
import { createUser, getAllUser } from '../../controller/user.controller.js';

const route = express.Router();

route.post('/create', createUser);
route.get('/', getAllUser);

export default route;
