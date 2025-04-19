import express from 'express';
import dotenv from 'dotenv';
import languageRuRoutes from './routes/language/ru.js';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/language/ru', languageRuRoutes);

const startServer = (port: number) => {
  app.listen(process.env.PORT as unknown as number || 3000, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

const PORT = 3000;
startServer(PORT);
