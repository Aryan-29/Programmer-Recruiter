const Recruiter = require("../models/recruiterModel");
const handlerFactory = require("./handlerFactory");

exports.getAllRecruiter = handlerFactory.getAll(Recruiter);
exports.getRecruiter = handlerFactory.getOne(Recruiter);
