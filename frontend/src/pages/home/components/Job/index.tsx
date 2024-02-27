import {Job} from 'src/@types';
import GridView from './GridView';
import LoadingGridView from './LoadingGridView';
import Empty from './Empty';
import {useSearchParams} from 'react-router-dom';
import ListView from './ListView';
import { useJobs } from '@services/firebase/hooks/useJobs';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};

const groupJobsByStatus = (jobs: Job[]): JobByStatus => {
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

const JobSection = () => {
  const {jobs, loading} = useJobs();
  
  const [searchParam] = useSearchParams();
  const view = searchParam.get('view') || 'grid';
  const jobByStatus = jobs
    ? groupJobsByStatus(jobs)
    : ({} as JobByStatus);
  return jobs?.length === 0 ? (
    <Empty />
  ) : view === 'kanban' ? (
    <div>kanban</div>
  ) : view === 'list' ? (
    <ListView jobs={jobs || []} />
  ) : (
    <>
      {loading ? (
        <LoadingGridView />
      ) : (
        <GridView jobByStatus={jobByStatus} />
      )}
    </>
  );
};

export default JobSection;
