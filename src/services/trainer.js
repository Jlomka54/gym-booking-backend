import TrainerCollection from '../db/models/Trainer.js';

export const getTrainers = () => TrainerCollection.find();

export const getTrainersbyId = (id) => TrainerCollection.findById(id);

export const addTrainer = (data) => TrainerCollection.create(data);

export const updateTrainer = async (_id, data, options = {}) => {
  const { upsert = false } = options;
  const result = await TrainerCollection.findOneAndUpdate({ _id }, data, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteTrainer = (filter) =>
  TrainerCollection.findOneAndDelete(filter);
