import {addDoc} from 'firebase/firestore';
import {jobPostings} from '..';
import {Job, Response} from 'src/@types';

const CreateJob = async (job: Partial<Job>): Promise<Response<Job, string>> => {
  if (!job.description && !job.workableDescription)
    return {status: 'Error', message: 'Job Description is empty'};
  if (!job.title) return {status: 'Error', message: 'Job Title is empty'};
  if (!job.jobLink) return {status: 'Error', message: 'Job Link is empty'};
  if (!job.company) return {status: 'Error', message: 'Company is empty'};

  try {
    const resp = await addDoc(jobPostings, job);

    return {
      status: 'Success',
      message: 'Successfully created the job',
      data: {id: resp.id, ...job} as Job,
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to create the job: ${(error as Error).message}`,
    };
  }
};

export {CreateJob};
