import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';
import LoadingGridView from './LoadingGridView';
import Empty from './Empty';
import {useSearchParams} from 'react-router-dom';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};

const groupJobsByStatus = (jobs: Job[]): JobByStatus => {
  return jobs.reduce((acc, job) => {
    const status = job.status as JobStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(job);
    return acc;
  }, {} as JobByStatus);
};

const JobSection = () => {
  const jobs = useFetchJobs();
  const [searchParam] = useSearchParams();
  const view = searchParam.get('view') || 'grid';
  const jobByStatus = jobs.data
    ? groupJobsByStatus(jobs.data)
    : ({} as JobByStatus);
  return jobs.data?.length === 0 ? (
    <Empty />
  ) : view === 'kanban' ? (
    <div>kanban</div>
  ) : view === 'list' ? (
    <div>list</div>
  ) : (
    <>
      {jobs.status === 'fetching' ? (
        <LoadingGridView />
      ) : (
        <GridView jobByStatus={jobByStatus} />
      )}
    </>
  );
};

export default JobSection;
