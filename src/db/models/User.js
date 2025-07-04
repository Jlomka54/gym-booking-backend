import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSetting } from '../../models/hooks.js';
import { emailRegexp } from '../../constants/user.js';
export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSetting);
userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);
export default UserCollection;
