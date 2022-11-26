const User = require("../models/userModel");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
