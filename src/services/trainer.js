import TrainerCollection from '../db/models/Trainer.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getTrainers = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const trainerQuery = TrainerCollection.find();
  if (filter.minRate) {
    trainerQuery.where('rating').gte(filter.minRating);
  }
  if (filter.maxRating) {
    trainerQuery.where('rating').lte(filter.maxRating);
  }

  const item = await trainerQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const total = await TrainerCollection.find()
    .merge(trainerQuery)
    .countDocuments();

  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    total,
    ...paginationData,
    item,
  };
};

export const getTrainersbyId = (id) => TrainerCollection.findById(id);

export const addTrainer = (data) => TrainerCollection.create(data);

export const updateTrainer = async (_id, data, options = {}) => {
  const { upsert = false } = options;
  const result = await TrainerCollection.findOneAndUpdate({ _id }, data, {
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
