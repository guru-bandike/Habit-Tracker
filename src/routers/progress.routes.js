import express from 'express';
import ProgressController from '../controllers/progress.controller.js';
import validateDate from '../middlewares/validateDate.validation.middleware.js';

const progressRouter = express.Router();

const progressController = new ProgressController();

progressRouter.get('/', progressController.renderProgressView);
progressRouter.post('/:habitId/toggle', validateDate, progressController.toggle);

export default progressRouter;
