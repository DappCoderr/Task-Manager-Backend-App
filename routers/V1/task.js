import express from 'express';
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../../controllers/task.controller.js';
import { isAdmin, verifyToken } from '../../middlewares/auth.mw.js';

const route = express.Router();

route.get('/', getAllTasks);
route.get('/user/:id', getTaskById);

route.post('/', verifyToken, createTask);
route.put('/:id', updateTaskById);

route.delete('/:id',verifyToken, isAdmin, deleteTaskById);

export default route;
