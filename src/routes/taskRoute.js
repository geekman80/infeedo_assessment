const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");

router.use(authMiddleware);
const {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
  getSingleTask,
  taskMetrics,
} = require("../controllers/taskController");

// Create a task
router.post("/tasks", createTask);

// Update a task
router.put("/tasks/:id", updateTask);

// Get all tasks (with paginated view)
router.get("/tasks", getAllTasks);

// Get a single task
router.get("/tasks/:id", getSingleTask);

// delete a task
router.delete("/tasks/:id", deleteTask);

// get metrics based on timeline
router.get("/task-metrics", taskMetrics);
module.exports = router;
