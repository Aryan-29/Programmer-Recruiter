const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//express.json is used for reading data from the body into req.body
app.use(express.json());

// All routes

//Handling undefined routes
app.all("*", (req, res, next) => {
  //next is used in a special way
  //If the next () recieves an argument, then express gets to know that there is an error
  //Here if argument given in next(), it will skip all the middlwares in the stack and will directly go to global error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
