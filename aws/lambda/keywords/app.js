import {OpenAI} from 'openai';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const description = body.description;
    if (!description) {
      console.error('Job description is missing');
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({error: 'Job description is missing'}),
      };
    }
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error('API key is missing');
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({error: 'API key is missing'}),
      };
    }

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
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

    let keywords = completion.choices[0].message.content;
    if (keywords.split(',').length >= 10) {
      keywords = keywords.split(',');
    } else {
      keywords = keywords.split('\n');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({keywords: keywords}),
    };
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.error('openAI API Error: ', err.message);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({error: 'openAI API Error: ' + err.message}),
      };
    } else {
      console.error('Error: ', err.message);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({error: err.message}),
      };
    }
  }
};
