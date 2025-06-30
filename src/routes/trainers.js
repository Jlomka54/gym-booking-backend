import { Router } from 'express';
import * as trainersController from '../controllers/trainers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const trainersRouter = Router();

trainersRouter.get('/', ctrlWrapper(trainersController.getTrainersController));
trainersRouter.get(
  '/:id',
  ctrlWrapper(trainersController.getTrainersByIdController),
);

export default trainersRouter;
