import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';
import LoadingGridView from './LoadingGridView';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
function JobSection() {
  const jobs = useFetchJobs();
  const jobByStatus = jobs.data
    ? jobs.data.reduce((acc, job) => {
        const status = job.status as JobStatus;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(job);
        return acc;
      }, {} as JobByStatus)
    : ({} as JobByStatus);
  // And assuming you want to mimic 3 job cards per status
  return jobs.status === 'fetching' ? (
    <LoadingGridView />
  ) : (
    <GridView jobByStatus={jobByStatus} />
  );
}

export default JobSection;
