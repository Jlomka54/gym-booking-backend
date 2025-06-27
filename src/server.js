import express from 'express';
// import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
// require('dotenv').config();

dotenv.config();

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/trener', (req, res) => {
    res.send('API работает');
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

// Подключение к MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB error:', err);
//   });
