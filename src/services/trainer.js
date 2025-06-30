import TrainerCollection from '../db/models/Trainer.js';

export const getTrainers = () => TrainerCollection.find();

export const getTrainersbyId = (id) => TrainerCollection.findById(id);
