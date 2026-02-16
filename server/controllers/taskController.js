const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task
      .find({ user: req.user.id })
      .sort({ order: 1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
