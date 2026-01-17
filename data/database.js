const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

let database;

const initDb = async (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    database = mongoose.connection;
    console.log('MongoDB connected using Mongoose');
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
