const Task = require("../models/Task");

const createTask = async (req, res) => { 
  const { title } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });

  try {
    // here i find the bug then was used without error handling
    // i change it to async await and i add try  and catch
    const task = await Task.create({ title });

    res.status(201).json({ msg: "Task Created", data: task });
  } catch (error) {
    res.status(500).json({ msg: "Error creating task", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    //then was used here without catch and async await
    const tasks = await Task.find();
    res.status(200).json({ msg: "Tasks List", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
};

const createTaskWithCheck = async (req, res) => {
  const { title } = req.body;

  try {
    // here i check if the task already exists before creating it
    const exist = await Task.findOne({ title });

    if (exist) {
      return res.status(400).json({ msg: "Task already exists" });
    }

    // if not exists create new task
    const newTask = await Task.create({ title });

    res.status(201).json({ msg: "Task Created", data: newTask });
  } catch (error) {
    // i add try and catch to handle any error
    res.status(500).json({ msg: "Error creating task", error: error.message });
  }
};

module.exports = {
  createTask,   
  getTasks,
  createTaskWithCheck,
};