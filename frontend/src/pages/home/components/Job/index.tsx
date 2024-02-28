import GridView from './GridView';
import LoadingGridView from './LoadingGridView';
import Empty from './Empty';
import {useSearchParams} from 'react-router-dom';
import ListView from './ListView';
import { useJobs } from '@services/firebase/hooks/useJobs';
import { JobByStatus, groupJobsByStatus } from '@utils/groupJobStatus';


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
