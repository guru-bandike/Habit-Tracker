import mongoose from 'mongoose';

const dbName = 'Habit-Tracker';

const connectToDB = async () => {
  const dbUrl = process.env.DB_URL;

  await mongoose.connect(dbUrl, { dbName });
  console.log('Successfully connected to DB.');
};

export default connectToDB;
