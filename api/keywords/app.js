import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import main from './src/openai.js';
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

const corsOptions = cors({
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'OPTIONS'],
});
// Enable CORS
app.use(corsOptions);

const port = process.env.PORT || 3000;
const localhost = process.env.Host || 'localhost';

app.post('/keywords', async (req, res) => {
  console.log('POST request received');
  try {
    const description = req.body;
    if (!description) {
      // empty request body
      res.status(400).send('Bad request');
      return;
    }
    const completion = await main(description);
    const keywords = completion.choices[0].message.content;
    // Send a response back
    const resp = JSON.stringify({keywords: keywords});
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://${localhost}:${port}`);
});
