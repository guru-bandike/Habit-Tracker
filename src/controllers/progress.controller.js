import validateMongodbObjectId from '../utils/validateMongodbObjectId.js';
import ProgressRepository from '../repositories/progress.repository.js';

const progressRepo = new ProgressRepository();

export default class ProgressController {
  renderProgressView(req, res, next) {
    res.render('progress', { title: 'Progress' });
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
