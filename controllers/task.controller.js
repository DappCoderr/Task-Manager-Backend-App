import Task from '../models/taskSchema';

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo, createdBy } = req.body;
    const task = {
      title: title,
      description: description,
      priority: priority,
      assignedTo: assignedTo,
      createdBy: createdBy,
    };
    const newTask = await Task.create(task);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.log('Error while creating task: ', error);
    res.status(500).json({ success: false, message: 'Fail: new task created' });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(201).json({ success: true, data: allTasks });
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
