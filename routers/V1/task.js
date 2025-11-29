import express from 'express';
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../../controllers/task.controller.js';
import { verifyToken } from '../../middlewares/auth.mw.js';

const route = express.Router();

route.get('', getAllTasks);
route.get('/user/:id', getTaskById);

route.post('', verifyToken, createTask);
route.put('/:id', updateTaskById);

route.delete('/:id', deleteTaskById);

export default route;
