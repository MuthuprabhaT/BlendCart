const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${connectDB.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
