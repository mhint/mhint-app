import express from 'express';
import dotenv from 'dotenv';
import languageRuRoutes from './routes/language/ru.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/language/ru', languageRuRoutes);

const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const PORT = 3000;
startServer(PORT);
