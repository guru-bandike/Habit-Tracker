import CustomError from '../errors/customError.js';
import HabitRepository from '../repositories/habit.repository.js';
import validateMongodbObjectId from '../utils/validateMongodbObjectId.js';

const habitRepo = new HabitRepository();

export default class HabitController {
  renderHabitsView(req, res, next) {
    res.render('habits', {
      title: 'Habits',
      cssFilePath: './css/habits.css',
      jsFilePath: './js/habits.js',
    });
  }

  async getAll(req, res, next) {
    try {
      const habits = await habitRepo.getAll();
      res
        .status(200)
        .json({ success: true, message: 'Existing habits found successfully!', habits });
    } catch (err) {
      next(err);
    }
  }

  async getAllWithTodayProgress(req, res, next) {
    try {
      const habitsWithTodayProgress = await habitRepo.getAllWithTodayProgress();
      res.status(200).json({
        success: true,
        message: 'Habits with today progtess successfully!',
        habitsWithTodayProgress,
      });
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    const { name } = req.body;

    try {
      if (!name || name.toString().length === 0)
        return next(new CustomError('Habit name is required!', 400, { name }));

      const addedHabit = await habitRepo.add(name);

      res.status(201).json({ success: true, message: 'Habit added successfully!', addedHabit });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await validateMongodbObjectId(id, 'habit');

      const deleteHabit = await habitRepo.delete(id);

      res.status(200).json({ success: true, message: 'Habit deleted successfully!', deleteHabit });
    } catch (err) {
      next(err);
    }
  }

  async toggleProgress(req, res, next) {
    const { habitId } = req.params;
    const { date } = req.body;

    try {
      await validateMongodbObjectId(habitId, 'haibt');

      const toggledProgress = await habitRepo.toggleProgress(habitId, date);

      res.status(200).json({
        success: true,
        message: 'Habit progress successfully toggled!',
        toggledProgress,
      });
    } catch (err) {
      next(err);
    }
  }
}
