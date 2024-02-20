import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
function JobSection() {
  const jobs = useFetchJobs();
  const jobByStatus = jobs.data
    ? jobs.data.reduce((acc, job) => {
        if (!acc[job.status as JobStatus]) {
          acc[job.status as JobStatus] = [];
        }
        acc[job.status as JobStatus].push(job);
        return acc as JobByStatus;
      }, {} as JobByStatus)
    : ({} as JobByStatus);
  return <GridView jobByStatus={jobByStatus} />;
}

export default JobSection;
