import {Job, Response} from 'src/@types';

// : Promise<Response<Partial<Job>, unknown>>
const fetchWorkable = async (
  url: string
): Promise<Response<Partial<Job>, unknown>> => {
  try {
    const response = await fetch(import.meta.env.VITE_WORKABLE_SCRAPER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    });
    if (!response.ok) {
      return {
        status: 'Error',
        message: 'Failed to fetch from workable API',
      };
    }
    const data = await response.json();
    console.log('data back from workable API', data);

    const jobInfo: Partial<Job> = {
      title: data.title,
      company: data.company,
      jobLink: url,
      hiringOrganization: {logo: data.hiringOrganization.logo},
      jobSource: 'Workable',
      workableDescription: data.workableDescription,
    };

    return {
      status: 'Success',
      message: 'Successfully fetched Workable API',
      data: jobInfo,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: 'Failed to fetch Workable API ',
    };
  }
};

export default fetchWorkable;
