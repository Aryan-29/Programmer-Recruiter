const cloudinary = require("cloudinary");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User, false, { path: "projects" });
exports.getMe = handlerFactory.getMe(User, { path: "projects" });

exports.getMyCollections = handlerFactory.getMyCollections(User);
exports.saveProjectToCollection = handlerFactory.saveProjectToCollection(User);
exports.removeProjectFromCollection =
  handlerFactory.removeProjectFromCollection(User);

// Update Profile
// Update User Profile ==> /api/v1/users/updateMe
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  if (req.body.role) {
    return next(new AppError("User cannot edit role", 400));
  }

  const newUserData = req.body;

  // User Profile Photo
  if (req?.files?.photo) {
    // Update new photo
    const file = req.files.photo;

    // TODO: Check if the user has not changes his photo. If yes not perform these steps
    // delete previous image from cloudinary
    if (req.user.photo.public_id) {
      cloudinary.v2.uploader.destroy(req.user.photo.public_id);
    }

    // add new image
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: process.env.CLOUDINARY_USER_PHOTO,
      width: 150,
      crop: "scale",
    });

    newUserData.photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // User Certifications
  // TODO: Multiple images updates

  const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      user: updatedUser,
    },
  });
});
