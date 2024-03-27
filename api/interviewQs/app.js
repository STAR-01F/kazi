import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import main from "./src/openai.js";

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
const corsOptions = cors({
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "OPTIONS"],
});

app.use(corsOptions);

const port = process.env.PORT || 3000;
const localhost = process.env.Host || "localhost";

app.post("/interview-questions", async (req, res) => {
  console.log("POST request received");
  try {
    const job = req.body;
    console.log("job", job);
    if (!job) {
      // empty request body
      res.status(400).send("Bad request");
      return;
    }
    // try to generate interview questions from job
    // if the questions are not generated, try again 3 times
    // if the questions are still not generated, return an error
    let questions;
    for (let i = 0; i <= 3; i++) {
      const completion = await main(job);
      questions = completion.choices[0].message.content;
      console.log("questions: ", questions);
      if (questions) {
        res.status(200).send({ questions: JSON.parse([questions]) });
        return;
      }
    }
    res.status(500).send("Internal server error");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://${localhost}:${port}`);
});
