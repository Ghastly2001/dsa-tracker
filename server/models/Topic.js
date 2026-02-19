const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    youtubeLink: String,
    leetcodeLink: String,
    codeforcesLink: String,
    articleLink: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
  },
  { timestamps: true },
);

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    problems: [problemSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Topic", topicSchema);
