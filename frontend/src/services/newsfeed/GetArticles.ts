import {Response} from 'src/@types';

export const GetArticles = async (
  addr: string
): Promise<Response<[], string>> => {
  try {
    const articles = await fetch(addr);

    const asJSON = await articles.json();

    return {
      status: 'Success',
      message: 'successfully fetched feed articles',
      data: asJSON,
    };
  } catch (error) {
    console.error('Error from GetArticles', error);
  }

  return {
    status: 'Error',
    message: 'failed to fetch feed articles',
  };
};
