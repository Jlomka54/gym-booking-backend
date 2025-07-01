import { model, Schema } from 'mongoose';

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
      required: true,
    },
    rating: {
      type: Number,
      max: 10,
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

const TrainerCollection = model('trainer', trainerSchema);
export default TrainerCollection;
