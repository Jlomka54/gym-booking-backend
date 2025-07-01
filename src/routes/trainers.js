import { Router } from 'express';
import * as trainersController from '../controllers/trainers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const trainersRouter = Router();

trainersRouter.get('/', ctrlWrapper(trainersController.getTrainersController));
trainersRouter.get(
  '/:id',
  ctrlWrapper(trainersController.getTrainersByIdController),
);
trainersRouter.post('/', ctrlWrapper(trainersController.addTrainerContoller));

trainersRouter.put(
  '/:id',
  ctrlWrapper(trainersController.upsertTrainerContoller),
);

trainersRouter.patch(
  '/:id',
  ctrlWrapper(trainersController.patchTrainerContoller),
);

trainersRouter.delete(
  '/:id',
  ctrlWrapper(trainersController.deleteTrainerContoller),
);

export default trainersRouter;
