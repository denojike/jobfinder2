const mongoose = require('mongoose');
const config = require('config');
// require('dotenv').config();
// const db_URI = process.env.DB_URI;
const db_URI = config.get('DB_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(db_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(db_URI);

    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
