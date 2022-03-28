var express = require("express");
const {
  createTask,
  getTask,
  getTasks,
  editTask,
  deleteTask,
} = require("../controllers/todo");
var router = express.Router();
router.post("/", createTask);
router.put("/:todoId", editTask);
router.get("/", getTasks);
router.get("/:todoId", getTask);

router.delete("/:todoId", deleteTask);

module.exports = router;
