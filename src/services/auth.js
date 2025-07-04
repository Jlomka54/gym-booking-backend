import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';
import bcrypt from 'bcryptjs';
import SessionCollection from '../models/Session.js';
import { randomBytes } from 'crypto';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';

export const register = async (userData) => {
  const { email, password } = userData;
  const user = await UserCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, 'Usel alredi exist');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UserCollection.create({
    ...userData,
    password: hashPassword,
  });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email invalid');
  }
  const passwordCopair = await bcrypt.compare(password, user.password);
  if (!passwordCopair) {
    throw createHttpError(401, 'password invalid');
  }
  await SessionCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
