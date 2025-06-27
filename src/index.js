import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Пример маршрута
app.get('/trener', (req, res) => {
  res.send('API работает');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runing on  ${PORT} port`);
});
