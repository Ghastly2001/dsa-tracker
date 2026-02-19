const Topic = require("../models/Topic");

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTopics };
