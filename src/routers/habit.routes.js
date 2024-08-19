import express from 'express';
import HabitsController from '../controllers/habit.controller.js';
import validateDate from '../middlewares/validateDate.validation.middleware.js';

const habitsRouter = express.Router();

const habitsController = new HabitsController();

habitsRouter.get('/', habitsController.renderHabitsView);
habitsRouter.get('/all', habitsController.getAll);
habitsRouter.get('/all-with-today-progress', habitsController.getAllWithTodayProgress);
habitsRouter.post('/', habitsController.add);
habitsRouter.delete('/:id', habitsController.delete);

export default habitsRouter;
