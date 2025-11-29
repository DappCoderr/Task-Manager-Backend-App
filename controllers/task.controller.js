import Task from '../models/taskSchema.js';
import User from '../models/userSchema.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const creator = await User.findOne({ name: req.userName });

    if (!creator) {
      return res
        .status(404)
        .json({ success: false, message: 'Creator not found' });
    }

    const assigner = await User.findOne({ name: assignedTo });

    if (!assigner) {
      return res
        .status(404)
        .json({ success: false, message: 'Assigner not found' });
    }

    const task = {
      title: title,
      description: description,
      assignedTo: assigner._id,
      createdBy: creator._id,
    };

    const newTask = await Task.create(task);

    const populateTask = await Task.findById(newTask._id)
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name');

    const cleaned = {
      _id: populateTask._id,
      title: populateTask.title,
      description: populateTask.description,
      status: populateTask.status,
      priority: populateTask.priority,
      assignedTo: populateTask.assignedTo?.name,
      createdBy: populateTask.createdBy?.name,
    };

    res.status(201).json({ success: true, data: cleaned });
  } catch (error) {
    console.log('Error while creating task: ', error);
    res
      .status(500)
      .json({ success: false, message: 'Fail to create new task' });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find()
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name');
    const formatTask = allTasks.map((task) => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo?.name,
      createdBy: task.createdBy?.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
    res.status(201).json({ success: true, data: formatTask });
  } catch (error) {
    console.log('Fail to get all tasks: ', error);
    res.status(500).json({ success: false, message: 'Fail to fetch all task' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    }
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.log('Error while fetching task created by user: ', error);
    res
      .status(500)
      .json({ success: false, message: 'Fail to fetch task by id' });
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.log('Error while fetching task created by user: ', error);
    res
      .status(500)
      .json({ success: false, message: 'Fail to fetch task by id' });
  }
};

export const deleteTaskById = (req, res) => {};

export const deleteCompletedTask = (req, res) => {};
