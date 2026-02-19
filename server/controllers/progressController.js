const User = require("../models/User");

const toggleProgress = async (req, res) => {
  try {
    const { problemId } = req.params;

    const user = await User.findById(req.user.id);

    const index = user.completedProblems.indexOf(problemId);

    if (index > -1) {
      user.completedProblems.splice(index, 1);
    } else {
      user.completedProblems.push(problemId);
    }

    await user.save();

    res.json(user.completedProblems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { toggleProgress };