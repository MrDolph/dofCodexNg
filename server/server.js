import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai'; // ← Correct import

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from MrDofCodeX' });
});

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 3000,
    });

    res.status(200).send({
      bot: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).send({
      error: 'Something went wrong with the OpenAI API request.',
      details: error.message || error,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
