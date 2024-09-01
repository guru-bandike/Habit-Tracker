import validateMongodbObjectId from '../utils/validateMongodbObjectId.js';
import ProgressRepository from '../repositories/progress.repository.js';
import HabitRepository from '../repositories/habit.repository.js';

const progressRepo = new ProgressRepository();
const habitRepo = new HabitRepository();

export default class ProgressController {
  async renderProgressView(req, res, next) {
    const inputDate = new Date(req.query.date);
    const date = isNaN(inputDate.getTime()) ? new Date() : inputDate;

    const habits = await habitRepo.getAll();
    const monthProgress = await progressRepo.getMonthProgress(date);

    const monthDetails = getDateDetails(date);

    res.render('progress', {
      title: 'Progress',
      cssFilePath: './css/progress.css',
      jsFilePath: './js/progress.js',
      habits,
      monthProgress,
      monthDetails,
    });
  }

  async toggle(req, res, next) {
    const { habitId } = req.params;
    const { date } = req.body;

    try {
      await validateMongodbObjectId(habitId, 'haibt');

      const toggledProgress = await progressRepo.toggle(habitId, date);

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

// - - - - - - - - - - - -  Helper Method Section: Start - - - - - - - - - - - - //

// Helper method to get date related details
const getDateDetails = (date) => {
  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const numOfDays = new Date(year, monthNum + 1, 0).getDate();
  const month = date.toLocaleString('en-us', { month: 'long' });

  return { numOfDays, monthNum, month, year };
};

// - - - - - - - - - - - -  Helper Method Section: End - - - - - - - - - - - - //
