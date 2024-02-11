import {OpenAI} from 'openai';

export const handler = async(event) =>{

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });


    try{
        const description = event.description;
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

        return {
            statusCode: 200,
            body: JSON.stringify(completion),
            headers: {
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Methods': 'POST', 
              'Access-Control-Allow-Headers': 'Content-Type', 
          },
            
        }

    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify({"error":err})
         
        }
    }

}

