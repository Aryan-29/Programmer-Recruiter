const express = require("express");
const authController = require("../controllers/authController");
const projectController = require("../controllers/projectController");
const { protect } = require("../middlewares/auth");
const User = require("../models/userModel");

const router = express.Router();

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(protect(User), projectController.addProject);
router
  .route("/:id")
  .get(projectController.getProject)
  .patch(protect(User), projectController.updateProject)
  .delete(protect(User), projectController.deleteProject);

module.exports = router;
