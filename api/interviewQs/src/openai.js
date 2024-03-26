/**
 * Analyzes the job description and generates tailored interview questions
 * to assess suitability for the role.
 * The function uses OpenAI's chat completions to generate the questions
 * based on a system message, a user message containing the job details,
 *
 */
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Generates tailored interview questions for a specific job position.
 * @param {string} job: The job title, company, and description.
 */
async function main(job) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Analyse the following job: ${job.title} 
                position at ${job.company} along with the job description below.
                Please curate a set of interview questions tailored to assess
                suitability for this role. Provide the questions in the following object format:
                '{
                    "generalQuestions": [question1, question2, question3],
                    "technicalQuestions": [question4, question5, question6],
<<<<<<< HEAD
                    "situationalQuestions": [question7, question8, question9],
=======
                    "SituationalQuestions": [question7, question8, question9],
>>>>>>> main
                }'
                ${job.description}`,
      },
      {
        role: "user",
        content: JSON.stringify(job),
      },
      {
        role: "assistant",
        content: `{
                    "generalQuestions": [question1, question2, question3],
                    "technicalQuestions": [question4, question5, question6],
                    "situationalQuestions": [question7, question8, question9],
                }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion;
}

export default main;
