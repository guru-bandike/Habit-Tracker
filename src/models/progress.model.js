import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true, index: true },
  date: { type: Date, required: true, index: true },
  status: { type: String, enum: ['done', 'not-done', 'none'], default: 'none', required: true },
});

const ProgressModel = mongoose.model('Progress', progressSchema);

export default ProgressModel;
