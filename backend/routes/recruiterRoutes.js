const express = require("express");
const authController = require("../controllers/authController");
const recruiterController = require("../controllers/recruiterController");

const router = express.Router();

router.post("/signup", authController.signupRecruiter);
router.post("/login", authController.loginRecruiter);

// Admin Routes
router.route("/").get(recruiterController.getAllRecruiter);
router.route("/:id").get(recruiterController.getRecruiter);

module.exports = router;
