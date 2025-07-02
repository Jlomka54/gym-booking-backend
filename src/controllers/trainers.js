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
export const addTrainerContoller = async (req, res) => {
  const data = await trainerServices.addTrainer(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully add trainer',
    data,
  });
};

export const upsertTrainerContoller = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await trainerServices.updateTrainer(id, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upsert trainer',
    data,
  });
};

export const patchTrainerContoller = async (req, res) => {
  const { id } = req.params;
  const resault = await trainerServices.updateTrainer(id, req.body);

  if (!resault) {
    throw createHttpError(404, `Trainer with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update trainer',
    data: resault.data,
  });
};

export const deleteTrainerContoller = async (req, res) => {
  const { id } = req.params;
  const data = await trainerServices.deleteTrainer({ _id: id });

  if (!data) {
    throw createHttpError(404, `Trainer with id=${id} not found`);
  }

  res.status(204).send();
};
