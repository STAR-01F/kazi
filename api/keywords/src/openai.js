/**
 * Analyzes the job description and identifies 10 keywords essential
 *  for enhancing a resume/CV tailored to this position.
 * The function uses OpenAI's chat completions to generate the keywords
 *  based on a system message and an assistant message.
 * The system message provides instructions for the assistant,
 * while the assistant message provides the initial keywords.
 * The generated keywords are returned as a comma-separated list.
 */
import {OpenAI} from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Generates keywords for enhancing a resume/CV tailored
 * to a specific job position.
 * @param {string} description The job description.
 * @return {Promise<void>} A promise that resolves
 *  when the keywords are generated.
 */
async function main(description) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Analyse the job description and identify 10 keywords
          essential for enhancing a resume/CV tailored to this position. 
          Choose specific,relevant terms that accurately represent the core
          skills, qualifications, and attributes required for the job. 
          Provide the 10 keywords as a comma-separated list in the format: 
          'keyword1, keyword2, keyword3...'.`,
      },
      {
        role: 'user',
        content: JSON.stringify(description),
      },
      {
        role: 'assistant',
        content: `keyword1, keyword2, keyword3, keyword4, keyword5, 
        keyword6, keyword7, keyword8, keyword9, keyword10`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  return completion;
}

export default main;
