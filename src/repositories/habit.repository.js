import CustomError from '../errors/customError.js';
import HabitModel from '../models/habit.model.js';
import ProgressModel from '../models/progress.model.js';

export default class HabitRepository {
  // Method to add/create new habit
  async add(name) {
    return await HabitModel.create({ name });
  }

  // Method to get all existing habits
  async getAll() {
    return await HabitModel.find({});
  }

  // Method to get all existing progress with today progress
  async getAllWithTodayProgress() {
    const habits = await HabitModel.find({});

    const today = new Date();

    const habitsWithTodayProgress = await this.#getHabitsProgress(habits, today, today);

    return habitsWithTodayProgress;
  }

  // Method to delete specific habit
  async delete(id) {
    const deletedHabit = await HabitModel.findByIdAndDelete(id);

    if (!deletedHabit) throw new CustomError('Habit not found!', 400, { id });

    await ProgressModel.deleteMany({ habitId: id });

    return deletedHabit;
  }

  // Method to toggle specific habit progress on specific date
  async toggleProgress(habitId, date) {
    const targetHabit = await HabitModel.findById(habitId);

    // Ensure habit exists
    if (!targetHabit) throw new CustomError('Habit not found!', 404);

    const startOfDate = new Date(date).setHours(0, 0, 0, 0);
    const endOfDate = new Date(date).setHours(23, 59, 59, 999);

    // Find existing progress
    const existingProgress = await ProgressModel.findOne({
      habitId,
      date: { $gte: startOfDate, $lte: endOfDate },
    });

    // If existing progress is present, toggle status
    if (existingProgress) {
      switch (existingProgress.status) {
        case 'done':
          existingProgress.status = 'not-done';
          break;

        case 'not-done':
          existingProgress.status = 'none';
          break;
        case 'none':
          existingProgress.status = 'done';
      }

      return await existingProgress.save();
    } else {
      // Else create new progress with 'Done' status
      const newProgress = await ProgressModel.create({
        habitId,
        date: new Date(date),
        status: 'done',
      });
      return newProgress;
    }
  }

  // - - - - - - - - - - - - Private Helper Method Section: Start - - - - - - - - - - - - //

  // Helper method to get habits progress between specified dates
  async #getHabitsProgress(habits, from, to) {
    // If no habits are provided, return empty array
    if (habits.length === 0) return [];

    // Extract habit IDs
    const habitIds = habits.map((h) => h._id);

    // Define start and end dates with time
    const startOfFrom = new Date(from).setHours(0, 0, 0, 0);
    const endOfTo = new Date(to).setHours(23, 59, 59, 999);

    // Find Progress
    const HabitsProgress = await ProgressModel.find({
      habitId: { $in: habitIds },
      date: { $gte: startOfFrom, $lte: endOfTo },
    });

    // Combine both habits and progress
    const habitsWithProgress = habits.map((h) => {
      const progress = HabitsProgress.filter((p) => p.habitId.equals(h._id));

      return {
        _id: h._id,
        name: h.name,
        progress: progress.length ? progress : [],
      };
    });

    return habitsWithProgress;
  }

  // - - - - - - - - - - - - Private Helper Method Section: End - - - - - - - - - - - - //
}
