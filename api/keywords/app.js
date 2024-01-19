import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import main from './src/openai.js';
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

const corsOptions = cors({
  origin: process.env.PORT,
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
  const description = req.body;
  const completion = await main(description);
  const keywords = completion.choices[0].message.content;
  // Send a response back
  const resp = JSON.stringify({keywords: keywords});
  res.status(200).send(resp);
});

app.listen(port, () => {
  console.log(`Example app listening at http://${localhost}:${port}`);
});
