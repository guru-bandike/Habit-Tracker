import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const HabitModel = mongoose.model('Habit', habitSchema);

export default HabitModel;
