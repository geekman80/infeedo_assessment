const Task = require("../models/taskModel");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { isValid, getLastDay } = require("../helpers/helper");

/* createTask() is an api function to create a task 
expects title, description, status from payload */

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
    });
    return res.status(201).json({
      message: "InFeedo, Your Task has been created successfully",
      body: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Unable to create task" });
  }
};

/* updateTask() is an api function to update a task 
expects title, description, status (fields to be updated) from payload
and id from query parameters. */

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await Task.findByPk(id);

    if (!existingTask) {
      return res.status(404).json({ error: "Given task does not exists." });
    }

    const updatedTime = sequelize.NOW;

    await existingTask.update({
      title,
      description,
      status,
      updatedTime,
    });

    return res.status(200).json({
      message: "InFeedo, Your Task has been updated successfully",
      body: existingTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Oops, Unable to update task" });
  }
};

/* getSingleTask() is an api function to fetch a task 
expects id from query parameters */

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      return res.status(200).json({
        message: "InFeedo, Here are the Task details",
        body: task,
      });
    } else {
      return res.status(404).json({
        message: "InFeedo, No task with given id",
      });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    return res
      .status(500)
      .json({ error: "Unable to fetch task, try with other tasks" });
  }
};

/* getAllTasks() is a paginated api function to return all tasks
by applying pagination */

const getAllTasks = async (req, res) => {
  try {
    const { page, totalPageSize } = req.query;
    const pages = parseInt(page);
    const entryInPage = parseInt(totalPageSize);

    // Check if page and totalPageSize are provided
    if (isNaN(pages) || isNaN(entryInPage)) {
      // If not provided, set default values or exclude pagination parameters
      const tasks = await Task.findAll({
        order: ["createdAt"],
      });

      return res.status(200).json({
        message: `InFeedo, Displaying all tasks.`,
        body: tasks,
      });
    }

    const offset = (pages - 1) * entryInPage;
    const tasks = await Task.findAll({
      order: ["createdAt"],
      offset,
      limit: entryInPage,
    });

    return res.status(200).json({
      message: `InFeedo, Displaying ${tasks.length} tasks as asked.`,
      body: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res
      .status(500)
      .json({ error: "Unable to fetch tasks, try with other tasks" });
  }
};

/* deleteTask() is an api function to delete a task 
expects id as query parameter */

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findByPk(id);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    await existingTask.destroy();
    return res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Unable to delete task" });
  }
};

/* taskMetrics() is an api function to return monthly metrics
expects date range in 'YY-mm'  */

const taskMetrics = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    console.log(startDate, endDate);
    if (isValid(startDate) && isValid(endDate)) {
      const lastDay1 = getLastDay(startDate);
      const lastDay2 = getLastDay(endDate);

      // Create formattedStartDate and formattedEndDate
      const formattedStartDate = `${startDate}-${lastDay1} 00:00:00`;
      const formattedEndDate = `${endDate}-${lastDay2} 00:00:00`;

      console.log(formattedStartDate, formattedEndDate);
      const metricsByMonth = await Task.findAll({
        attributes: [
          [
            sequelize.fn(
              "DATE_FORMAT",
              sequelize.col("createdAt"),
              "%M %Y" // Format as "Month Year"
            ),
            "date",
          ],
          [sequelize.fn("COUNT", "*"), "count"],
          "status",
        ],
        where: {
          createdAt: {
            [Op.between]: [formattedStartDate, formattedEndDate],
          },
        },
        group: ["date", "status"],
      });

      // Organize metrics by month
      const metrics = {};

      metricsByMonth.forEach((result) => {
        const date = result.get("date");
        if (!metrics[date]) {
          metrics[date] = {
            open_tasks: 0,
            inprogress_tasks: 0,
            completed_tasks: 0,
          };
        }
        const status = result.status;
        metrics[date][status.toLowerCase() + "_tasks"] = result.get("count");
      });

      // Convert metrics object to an array of objects with date properties
      const metricsArray = Object.keys(metrics).map((date) => ({
        date,
        metrics: metrics[date],
      }));
      metricsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
      res.json(metricsArray);
    } else {
      res.status(400).json({ error: "Invalid Date" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  taskMetrics,
};
