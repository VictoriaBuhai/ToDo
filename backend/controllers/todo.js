module.exports = {
  createTask,
  editTask,
  getTask,
  getTasks,
  deleteTask,
};
const Todo = require("../models/todo");

async function createTask(req, res, next) {
  console.log(req.body);
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function editTask(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (todo) {
      let todoEdite = await Todo.findOneAndUpdate(
        { _id: req.params.todoId },
        req.body,
        {
          new: true,
        }
      );
      res.send(todoEdite);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function getTask(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (todo) {
      res.send(todo);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function deleteTask(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (todo) {
      await Todo.findByIdAndDelete(req.params.todoId);
      res.send({ ok: 1 });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function getTasks(req, res, next) {
  try {
    const todos = await Todo.find();
    console.log(todos);
    if (todos) {
      res.send(todos);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
