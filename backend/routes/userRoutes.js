const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

router.post("/forgotPassword", authController.forgotPasswordUser);
router.patch("/resetPassword/:token", authController.resetPasswordUser);

module.exports = router;
