//import { generateUploadURL } from "./s3";

const generateUploadURL = require("./s3");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//var indexRouter = require("./routes/index");
const todosRouter = require("./routes/todo");

const app = express();
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
const mongoose = require("mongoose");
const dev_db_url =
  "mongodb+srv://Vicky:naruto123@cluster0.pazio.mongodb.net/TodoList?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(mongoDB, dbOptions);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
app.use("/todos", todosRouter);

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//const Todos = require("./models/todo");

const port = 4040;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
module.exports = app;
