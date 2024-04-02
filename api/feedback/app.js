import express from "express";
import nodemailer from "nodemailer";
const app = express();
import dotenv from "dotenv";
import cors from "cors";

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

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "username",
    pass: "password",
  },
});

app.post("/send-feedback", async (req, res) => {
  const { like, improvement, comments } = req.body;
  const content = `Like: ${like}\nImprovement: ${improvement}\nComments: ${comments}`;

  try {
    const info = await transporter.sendMail({
      from: '"Kazi" <kazi.stars.dev@gmail.com>',
      to: "abmutungi@gmail.com",
      subject: "Feedback",
      text: content,
    });

    console.log("Message sent: %s", info.messageId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Feedback app listening at http://${localhost}:${port}`);
});
