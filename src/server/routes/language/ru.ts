import express from 'express';
import dotenv from 'dotenv';
import runAssistant from '../../api/language/ru.js';

dotenv.config();

const router = express.Router();

router.post('/conjugate', async (req, res) => {
  try {
    const assistantResponse = await runAssistant();

    res.status(200).json({ message: assistantResponse });
  } catch (error) {
    console.error('Error during api/language/ru/conjugate route:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
