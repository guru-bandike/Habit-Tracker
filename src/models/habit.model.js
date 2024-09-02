import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const HabitModel = mongoose.model('Habit', habitSchema);

habitSchema.path('name').set((name) => {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
});

export default HabitModel;
