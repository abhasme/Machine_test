const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/MT"; // Local URL
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connection to Database Successful => URL: ${URL}`);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();
