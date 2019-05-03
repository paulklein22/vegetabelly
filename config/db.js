const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // These two added due to MongoDB deprecation warnings
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exits the Node.js process on error/failure
    process.exit(1);
  }
};

module.exports = connectDB;
