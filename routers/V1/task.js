import express from 'express';
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../../controllers/task.controller';

const route = express.Router();

route.get('/', getAllTasks);
route.get('/user/:id', getTaskById);

route.post('/newTask', createTask);
route.put('/update/:id', updateTaskById);

route.delete('/delete/:id', deleteTaskById);

export default route;
