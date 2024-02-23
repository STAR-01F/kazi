import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';
import LoadingGridView from './LoadingGridView';
import Empty from './Empty';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
function JobSection() {
  const jobs = useFetchJobs();
  const jobByStatus = jobs.data
    ? jobs.data.reduce((acc, job) => {
        const status = job.status as JobStatus;
        if (job.status === '') {
          job.status = 'Saved';
        }
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(job);
        return acc;
      }, {} as JobByStatus)
    : ({} as JobByStatus);
  return jobs.status === 'fetching' ? (
    <LoadingGridView />
  ) : jobs.data?.length === 0 ? (
    <Empty />
  ) : (
    <GridView jobByStatus={jobByStatus} />
  );
}

export default JobSection;
