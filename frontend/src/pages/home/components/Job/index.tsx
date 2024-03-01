import {Job} from 'src/@types';
import GridView from './GridView';
import LoadingGridView from './LoadingGridView';
import Empty from './Empty';
import {useSearchParams} from 'react-router-dom';
import ListView from './ListView';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {Timestamp} from 'firebase/firestore';

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
  const sort = searchParam.get('sort') || 'newest';
  // useEffect(() => {
  console.log('jobs', jobs);
  jobs.sort((a, b) => {
    if (!a.createdat || !b.createdat) {
      return 0;
    }
    const createdAtA = (a.createdat as Timestamp).toMillis();
    const createdAtB = (b.createdat as Timestamp).toMillis();
    if (sort === 'oldest') {
      return createdAtA - createdAtB;
    }
    if (sort === 'last updated') {
      const updatedAtA = (a.updatedat as Timestamp).toMillis();
      const updatedAtB = (b.updatedat as Timestamp).toMillis();
      return updatedAtB - updatedAtA;
    }
    return createdAtB - createdAtA;
  });
  // }, [jobs, sort]); // dependencies array

  const jobByStatus = jobs ? groupJobsByStatus(jobs) : ({} as JobByStatus);
  return jobs?.length === 0 ? (
    <Empty />
  ) : view === 'kanban' ? (
    <div>kanban</div>
  ) : view === 'list' ? (
    <ListView jobs={jobs || []} />
  ) : (
    <>
      {loading ? <LoadingGridView /> : <GridView jobByStatus={jobByStatus} />}
    </>
  );
};

export default JobSection;
