const express = require("express");
const authController = require("../controllers/authController");
const recruiterController = require("../controllers/recruiterController");

const router = express.Router();

router.route("/").get(recruiterController.getAllRecruiter);
router.route("/:id").get(recruiterController.getRecruiter);

router.post("/signup", authController.signupRecruiter);
router.post("/login", authController.loginRecruiter);

router.post("/forgotPassword", authController.forgotPasswordRecruiter);
router.patch("/resetPassword/:token", authController.resetPasswordRecruiter);

module.exports = router;
