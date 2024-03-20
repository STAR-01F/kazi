import Keywords from 'src/@types/keyword';
import type {Response} from 'src/@types';
/**
 * Retrieves keywords for a given description.
 * @param description - The description for which to retrieve keywords.
 */
const getKeywords = async (
  description: string
): Promise<Response<Keywords, unknown>> => {
  console.log(import.meta.env.VITE_OPENAI_HOST);
  try {
    const response = await fetch(`${import.meta.env.VITE_OPENAI_HOST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch keywords.');
    }
    return {
      status: 'Success',
      data: data,
      message: 'Successfully fetched the keywords',
    };
  } catch (error) {
    console.error('failed to fetch keywords API', error);
    return {status: 'Error', message: 'Could not generate key words'};
  }
};

export default getKeywords;
