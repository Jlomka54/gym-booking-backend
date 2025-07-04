import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSetting } from '../models/hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

sessionSchema.post('save', handleSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSetting);
sessionSchema.post('findOneAndUpdate', handleSaveError);

const SessionCollection = model('session', sessionSchema);
export default SessionCollection;
