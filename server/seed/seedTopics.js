const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Topic = require("../models/Topic");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedData = require("./topicData.js"); 

const seed = async () => {
  try {
    await Topic.deleteMany();
    await Topic.insertMany(seedData);
    console.log("Topics Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();