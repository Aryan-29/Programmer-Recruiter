const User = require("../models/userModel");
const Recruiter = require("../models/recruiterModel");
const handlerFactory = require("./handlerFactory");

// POST -> /api/v1/users/signup
exports.signupUser = handlerFactory.signup(User);
// POST -> /api/v1/recruiter/signup
exports.signupRecruiter = handlerFactory.signup(Recruiter);

// POST -> /api/v1/users/login
exports.loginUser = handlerFactory.login(User);
// POST -> /api/v1/recruiter/login
exports.loginRecruiter = handlerFactory.login(Recruiter);
