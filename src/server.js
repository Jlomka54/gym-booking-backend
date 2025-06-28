import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
// require('dotenv').config();
import { getTrainers, getTrainersbuId } from './services/trainer.js';

dotenv.config();

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/trainers', async (req, res) => {
    const data = await getTrainers();
    res.json({
      status: 200,
      message: 'Ssuccessfully found trainers',
      data,
    });
  });
  app.get('/trainers/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getTrainersbuId(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Trainer with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Ssuccessfully find  trainers with id ${id}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });
  const PORT = Number(getEnvVar('PORT', 3000));
  app.listen(PORT, () => {
    console.log(`Server running on  ${PORT} port`);
  });
};
