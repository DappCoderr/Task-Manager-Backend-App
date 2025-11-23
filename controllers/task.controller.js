import Task from "../models/taskSchema";

export const createTask = async(req,res) => {
    try {
        const {title, description, priority, assignedTo, createdBy} = req.body
        const task = {
            title: title,
            description: description,
            priority: priority,
            assignedTo: assignedTo,
            createdBy: createdBy
        }
        const newTask = await Task.create(task)
        res.status(201).json({ success: true, data:newTask});
    } catch (error) {
        console.log("Error while creating task: ", error)
        res.status(500).json({ success: false, message: 'Fail: new task created'});
    }
}

export const getAllTasks = async(req, res) => {
    try {
        const allTasks = await Task.find()
        res.status(201).json({ success: true, data:allTasks})
    } catch (error) {
        console.log("Fail to get all tasks: ", error)
        res.status(500).json({ success: false, message: 'Fail to fetch all task'});
    }
}

export const getTaskById = async(req, res) => {
    try {
        const {id} = req.params;
        const taskCreatedBy = await Task.findOne({id})
        res.status(201).json({ success: true, data:taskCreatedBy})
    } catch (error) {
        console.log("Error while fetching task created by user: ", error)
        res.status(500).json({ success: false, message: 'Fail to fetch task by id'});
    }
}

export const getUserTask = (req,res) => {}
export const updateTaskById = (req, res) => {}
export const deleteTaskById = (req, res) => {}
export const deleteAllTask = (req,res) => {}
export const deleteCompletedTask = (req, res) => {}