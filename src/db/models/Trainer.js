import { model, Schema } from 'mongoose';
import { maxRating, minRating } from '../../constants/trainers.js';
import { handleSaveError, setUpdateSetting } from '../../models/hooks.js';

const trainerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
    },
    rating: {
      type: Number,
      min: minRating,
      max: maxRating,
      required: true,
    },
    acceptingNew: {
      type: Boolean,
      default: true,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
trainerSchema.post('save', handleSaveError);
trainerSchema.pre('findOneAndUpdate', setUpdateSetting);

trainerSchema.post('findOneAndUpdate', handleSaveError);

const TrainerCollection = model('trainer', trainerSchema);
export default TrainerCollection;
