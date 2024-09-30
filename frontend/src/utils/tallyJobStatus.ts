import {UserJob, UserProfiles, JobStatusCount} from 'src/@types';

const JobStatusTallies = (
  arrOfJobs: UserJob[],
  arrOfDeletedJobs: UserProfiles
): {} => {
  const result: JobStatusCount = {};

  arrOfJobs.forEach((job) => {
    if (result[job.status] === undefined) {
      result[job.status] = 0;
    }
    result[job.status] += 1;
  });

  arrOfDeletedJobs!.deletedJobs.forEach((job) => {
    if (result[job.deletedState] === undefined) {
      result[job.deletedState] = 0;
    }
    result[job.deletedState] += 1;
  });

  let count = 0;
  for (const [key, value] of Object.entries(result)) {
    if (key != 'undefined') {
      count += value;
    }
    result['Total'] = count;
  }

  return result;
};

export default JobStatusTallies;
