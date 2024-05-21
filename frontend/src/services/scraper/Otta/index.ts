import {Job, Response} from 'src/@types';

const Otta = async (url: string): Promise<Response<Partial<Job>, unknown>> => {
  try {
    const response = await fetch(import.meta.env.VITE_OTTA_SCRAPER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    });

    const data = await response.json();

    if (data.error || !response.ok) {
      return {
        status: 'Error',
        message: 'Invalid job url',
        data: data,
      };
    }

    const jobInfo: Partial<Job> = {
      title: data.title,
      company: data.hiringOrganization.name,
      jobLink: url,
      description:
        data.description + '\n' + data.skills + '\n' + data.responsibilities,
      ...data,
      jobSource: 'Otta',
    };

    return {
      status: 'Success',
      message: 'Successfully saved job',
      data: jobInfo,
    };
  } catch (error) {
    console.error('failed to fetch Otta API', error);
    return {
      status: 'Error',
      message: 'Internal server error',
      data: error,
    };
  }
};
export default Otta;
