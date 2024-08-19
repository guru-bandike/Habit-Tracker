import ProgressModel from '../models/progress.model.js';
import HabitModel from '../models/habit.model.js';

export default class ProgressRepository {
  // Helper method to get habits progress between specified dates
  async getHabitsProgress(habits, from, till) {
    // If no habits are provided, return empty array
    if (habits.length === 0) return [];

    // Extract habit IDs
    const habitIds = habits.map((h) => h._id);

    // Define start and end dates with time
    const startOfFrom = new Date(from).setHours(0, 0, 0, 0);
    const endOfTill = new Date(till).setHours(23, 59, 59, 999);

    // Find Progress
    const HabitsProgress = await ProgressModel.find({
      habitId: { $in: habitIds },
      date: { $gte: startOfFrom, $lte: endOfTill },
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

  // Method to toggle specific habit progress on specific date
  async toggle(habitId, date) {
    const targetHabit = await HabitModel.findById(habitId);

    // Ensure habit exists
    if (!targetHabit) throw new CustomError('Habit not found!', 404);

    // Find existing progress
    const existingProgress = await this.#findOne(habitId, date, date);

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

  // Helper method to Delete progresse by Habit ID
  async deleteByHabitId(habitId) {
    await ProgressModel.deleteMany({ habitId });
  }

  // - - - - - - - - - - - - Private Helper Method Section: Start - - - - - - - - - - - - //
  async #findOne(habitId, from, till) {
    const startOfFrom = new Date(from).setHours(0, 0, 0, 0);
    const endOfTill = new Date(till).setHours(23, 59, 59, 999);

    return await ProgressModel.findOne({
      habitId,
      date: { $gte: startOfFrom, $lte: endOfTill },
    });
  }
  // - - - - - - - - - - - - Private Helper Method Section: End - - - - - - - - - - - - //
}
