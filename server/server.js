import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai'; // ← Correct import

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// console.log("apiKey:", process.env.OPENAI_API_KEY)

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



//////If i had to use DeepSeek API calls
// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';
// import fetch from 'node-fetch';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.MrDofCodexAPIKeys}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat', // or 'deepseek-coder' if you're using the code-focused model
//         messages: [
//           { role: 'user', content: prompt }
//         ],
//         temperature: 0.7,
//         max_tokens: 3000
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       res.status(200).send({
//         bot: data.choices[0].message.content,
//       });
//     } else {
//       res.status(500).send({
//         error: 'DeepSeek API error',
//         details: data.error || data,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       error: 'Server error',
//       details: error.message || error,
//     });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
