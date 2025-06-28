import TrainerCollection from '../db/models/Trainer.js';

export const getTrainers = () => TrainerCollection.find();

export const getTrainersbuId = (id) => TrainerCollection.findById(id);
