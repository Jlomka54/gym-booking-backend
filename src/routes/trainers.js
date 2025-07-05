import { Router } from 'express';
import * as trainersController from '../controllers/trainers.js';

import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  trainerAddSchema,
  trainerUpdateSchema,
} from '../validation/trainers.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/autheticate.js';

const trainersRouter = Router();
trainersRouter.use(authenticate);

trainersRouter.get('/', ctrlWrapper(trainersController.getTrainersController));
trainersRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(trainersController.getTrainersByIdController),
);
trainersRouter.post(
  '/',
  validateBody(trainerAddSchema),
  ctrlWrapper(trainersController.addTrainerContoller),
);

trainersRouter.put(
  '/:id',
  isValidId,
  validateBody(trainerAddSchema),
  ctrlWrapper(trainersController.upsertTrainerContoller),
);

trainersRouter.patch(
  '/:id',
  isValidId,
  validateBody(trainerUpdateSchema),
  ctrlWrapper(trainersController.patchTrainerContoller),
);

trainersRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(trainersController.deleteTrainerContoller),
);

export default trainersRouter;
