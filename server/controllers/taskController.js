const Task = require("../models/Task");

/**
 * CREATE TASK
 * POST /api/tasks
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * GET MY TASKS
 * GET /api/tasks/my
 */
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * GET TASK COUNT (FOR DASHBOARD)
 * GET /api/tasks/count
 */
exports.getTaskCount = async (req, res) => {
  try {
    const count = await Task.countDocuments({
      assignedTo: req.user.id
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
