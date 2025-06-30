import * as trainerServices from '../services/trainer.js';
import createHttpError from 'http-errors';
export const getTrainersController = async (req, res) => {
  const data = await trainerServices.getTrainers();
  res.json({
    status: 200,
    message: 'Ssuccessfully found trainers',
    data,
  });
};

export const getTrainersByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await trainerServices.getTrainersbyId(id);

  if (!data) {
    throw createHttpError(404, `Trainer with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Ssuccessfully find  trainers with id ${id}`,
    data,
  });
};
