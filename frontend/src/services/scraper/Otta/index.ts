import {Job, Response} from 'src/@types';

const Otta = async (url: string): Promise<Response<Partial<Job>, unknown>> => {
  try {
    const responce = await fetch(import.meta.env.VITE_OTTA_SCRAPER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    });
    if (!responce.ok) {
      return {
        status: 'Error',
        message: 'Failed to fetch Otta API',
      };
    }
    const data = await responce.json();
    const jobInfo: Partial<Job> = {
      title: data.title,
      company: data.hiringOrganization.name,
      description:
        data.description + '\n' + data.skills + '\n' + data.responsibilities,
      ...data,
    };
    return {
      status: 'Success',
      message: 'Successfully fetched Otta API',
      data: jobInfo,
    };
  } catch (error) {
    console.error('failed to fetch Otta API', error);
    return {
      status: 'Error',
      message: 'Failed to fetch Otta API ' + (error as Error).message,
    };
  }
};
export default Otta;
