import Joi from 'joi';
import { maxRating, minRating } from '../constants/trainers.js';

export const trainerAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  photoUrl: Joi.string().required(),
  specialization: Joi.string(),
  rating: Joi.number().min(minRating).max(maxRating),
  acceptingNew: Joi.boolean(),
  experienceYears: Joi.number().required(),
});

export const trainerUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  photoUrl: Joi.string(),
  specialization: Joi.string(),
  rating: Joi.number().min(minRating).max(maxRating),
  acceptingNew: Joi.boolean(),
  experienceYears: Joi.number(),
});
