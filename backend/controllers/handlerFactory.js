const catchAsync = require("../utils/catchAsync");
const createSendToken = require("../utils/createSendToken");
const AppError = require("../utils/appError");

exports.signup = (Model) =>
  catchAsync(async (req, res, next) => {
    // Check if email exists
    const user = await Model.findOne({ email: req.body.email });

    // If exists sohwq error
    if (user) return next(new AppError(`Email already exists`, 400));

    // Create new user if all valid
    const newUser = await Model.create(req.body);

    // Send welcomming email

    // Create JWT Token and send
    createSendToken(newUser, 201, req, res);
  });

exports.login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if email and password exists
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    //2) Check if the email exists and password is correct
    const user = await Model.findOne({ email }).select("+password");

    //checks if user exists and if password is correct or not
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    //3) if everything ok, send the token to client
    createSendToken(user, 200, req, res);
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const users = await Model.find();

    if (!users) {
      return next(new AppError("Not found"));
    }

    res.status(200).json({
      success: true,
      results: users.length,
      users,
    });
  });

//The popOptions is needed as if any fields gets populated and then shows
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
