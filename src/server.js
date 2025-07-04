import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import trainersRouter from './routes/trainers.js';
import authRouter from './routes/auth.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// require('dotenv').config();

dotenv.config();

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/trainers', trainersRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);
  const PORT = Number(getEnvVar('PORT', 3000));
  app.listen(PORT, () => {
    console.log(`Server running on  ${PORT} port`);
  });
};
