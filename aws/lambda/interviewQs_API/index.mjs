/**
 * Analyzes the job description and generates tailored interview questions
 * to assess suitability for the role.
 * The function uses OpenAI's chat completions to generate the questions
 * based on a system message, a user message containing the job details,
 *
 */
import { OpenAI } from 'openai';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const job = body.job
    if (job.description) {
      const OPENAI_API_KEY = process.env.API_KEY;
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Analyse the following job: ${job.title} 
                    position at ${job.company} along with the job description below.
                    Please curate a set of interview questions tailored to assess
                    suitability for this role. Provide the questions in the following object format:
                    '{
                        "generalQuestions": [question1, question2, question3],
                        "technicalQuestions": [question4, question5, question6],
                        "situationalQuestions": [question7, question8, question9],
                    }'
                    ${job.description}`,
          },
          {
            role: 'user',
            content: JSON.stringify(job),
          },
          {
            role: 'assistant',
            content: `{
                        "generalQuestions": [question1, question2, question3],
                        "technicalQuestions": [question4, question5, question6],
                        "situationalQuestions": [question7, question8, question9],
                    }`,
          },
        ],
        model: 'gpt-3.5-turbo',
      });
      const interviewQs = completion.choices[0].message.content;
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions: JSON.parse([interviewQs]) }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Job description is missing' }),
      };
    }
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'openAI API Error: ' + err.message }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }
};
