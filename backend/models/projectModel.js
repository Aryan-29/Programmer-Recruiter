const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: "String",
    required: [true, "A Project must have a title"],
  },

  description: {
    type: "String",
  },

  projectLink: {
    type: "String",
    required: [true, "A Project must have a link"],
  },

  gitHubLink: {
    type: "String",
  },

  tags: [
    {
      type: String,
      required: [true, "Require atleast two tags"],
    },
  ],

  image: {
    public_id: {
      type: String,
      required: [true, ""],
    },
    url: {
      type: String,
      required: [true, "Project Image is required"],
    },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
