import {Timestamp, addDoc} from 'firebase/firestore';
import {jobPostings} from '..';
import {Job} from 'src/@types';

const CreateJob = async (job: Partial<Job>) => {
  if (!job.description)
    return {status: 'Error', message: 'Job Description is empty'};
  try {
    const createdAt = Timestamp.now();
    const updatedAt = Timestamp.now();
    job.createdAt = createdAt;
    job.updatedAt = updatedAt;
    const resp = await addDoc(jobPostings, job);

    return {
      status: 'Success',
      message: 'Successfully created the job',
      data: {id: resp.id, ...job},
    };
  } catch (error) {
    return {
      status: 'Error',
      message: `Failed to create the job: ${(error as Error).message}`,
    };
  }
};

export {CreateJob};
