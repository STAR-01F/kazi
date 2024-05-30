import {Job, Response} from 'src/@types';

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

    const data = await response.json();

    if (data.error || !response.ok) {
      return {
        status: 'Error',
        message: 'Failed to save job',
        data: data.error,
      };
    }

    const jobInfo: Partial<Job> = {
      title: data.title,
      company: data.company,
      jobLink: url,
      hiringOrganization: {logo: data.hiringOrganization.logo},
      jobSource: 'Workable',
      workableDescription: data.workableDescription,
      workableLocation: data.workableLocation,
    };

    return {
      status: 'Success',
      message: 'Successfully saved job',
      data: jobInfo,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: 'Failed to save job',
    };
  }
};

export default fetchWorkable;
