import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import main from './src/openai.js';
import csurf from 'csurf';
import helmet from 'helmet';
const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(csurf());
app.use(helmet());

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
    const request = req.body;
    if (!request.description) {
      // empty request body
      res.status(400).send('Bad request');
      return;
    }
    // try to generate keywords from job description
    // if the keywords are not generated, try again 3 times
    // if the keywords are still not generated, return an error
    let keywords;
    for (let i = 0; i <= 3; i++) {
      const completion = await main(request.description);
      keywords = completion.choices[0].message.content;
      console.log(keywords);
      if (keywords.split(',').length >= 10) {
        res.status(200).send({keywords: keywords});
        return;
      }
    }
    res.status(500).send('Internal server error');
    // Send a response back
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://${localhost}:${port}`);
});
