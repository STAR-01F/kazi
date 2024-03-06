import {Job} from 'src/@types';

export type JobStatus = 'Saved' | 'Applied' | 'Interview' | 'Rejected';

export type JobByStatus = {
  [status in JobStatus]: Job[];
};

export const groupJobsByStatus = (jobs: Job[]): JobByStatus => {
  return jobs.reduce((acc, job) => {
    const status = job.status as JobStatus;
    if (job.status === '') {
      job.status = 'Saved';
    }
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(job);
    return acc;
  }, {} as JobByStatus);
};
