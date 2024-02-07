import {Job} from 'src/@types';
import type {Response} from 'src/@types';

const CreateJob = async (
  job: Partial<Job>
): Promise<Response<Job, unknown>> => {
  if (!job.description)
    return {status: 'Error', message: 'Job Description is empty'};
  try {
    const response = await fetch(`${import.meta.env.VITE_JOB_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    const data = await response.json();
    if (response.ok) {
      return {
        status: 'Success',
        message: 'Job uploaded',
        data: data,
      };
    }
    return {status: 'Error', message: data.message};
  } catch (error) {
    console.error(error);
    return {status: 'Error', message: JSON.stringify(error)};
  }
};

export default CreateJob;
