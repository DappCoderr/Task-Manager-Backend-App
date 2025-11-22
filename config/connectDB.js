import mongoose from 'mongoose';
import { DB_URL } from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL || "mongodb://127.0.0.1:27017/taskmanager");
    console.log("DB connected")
  } catch (error) {
    console.log('Error while connecting with DB: ', error);
  }
};

export default connectDB;
