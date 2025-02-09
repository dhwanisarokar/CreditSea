const express = require("express");
const { errorHandler } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError.js");
const { status } = require("http-status");
const router = require("./routes/transaction.routes.js");

const cors = require("cors");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, "Not found"));
});

// golab Error Middleware
app.use(errorHandler);

module.exports = app;
