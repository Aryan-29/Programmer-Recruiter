const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const recruiterSchema = mongoose.Schema({
  companyName: {
    type: "String",
    required: [true, "A recruiter must have a company name"],
  },
  companyEmail: {
    type: "String",
    required: [true, "A recruiter must have a company email"],
  },
  companyLogo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dhyyf1dnu/image/upload/v1643810957/Job%20Hunter%20Photos/default_oxo7cf.jpg",
    },
  },
  companyDescription: {
    type: String,
  },
  role: {
    type: String,
    default: "recruiter",
  },
  password: {
    type: String,
    required: [true, "A recruiter must have a password"],
    minlength: [8, "A password must have atleast 8 character"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //Only works on CREATE & SAVE!!
      validator: function (el) {
        return el === this.password; //if equal returns true(no error)  & if no equal returns false (error)
      },
      message: "Password and Confirm password don't match",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Encrypt Password before save
recruiterSchema.pre("save", async function (next) {
  //Only run this function if password is modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

recruiterSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

recruiterSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

recruiterSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
module.exports = Recruiter;
