import CustomError from '../errors/customError.js';
import HabitModel from '../models/habit.model.js';
import ProgressRepository from './progress.repository.js';

const progressRepo = new ProgressRepository();

export default class HabitRepository {
  // Method to add/create new habit
  async add(name) {
    return await HabitModel.create({ name });
  }

  // Method to get all existing habits
  async getAll() {
    return await HabitModel.find({});
  }

  // Method to get one specific habits
  async get(id) {
    return await HabitModel.findById(id);
  }

  // Method to get all existing progress with today progress
  async getAllWithTodayProgress() {
    const habits = await HabitModel.find({});

    const today = new Date();

    const habitsWithTodayProgress = await progressRepo.getHabitsProgress(habits, today, today);

    return habitsWithTodayProgress;
  }

  // Method to delete specific habit
  async delete(id) {
    const deletedHabit = await HabitModel.findByIdAndDelete(id);

    if (!deletedHabit) throw new CustomError('Habit not found!', 400, { id });

    await progressRepo.deleteByHabitId(id);

    return deletedHabit;
  }
}
