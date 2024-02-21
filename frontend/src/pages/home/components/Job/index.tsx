import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';
import Empty from './Empty';
import PageCircular from '@components/progress/PageCircular';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
function JobSection() {
  const jobs = useFetchJobs();

  if (jobs.status === 'fetching') {
    return <PageCircular sx={{width: '100%', height: '100%'}} />;
  }
  const jobsData = jobs.data ?? [];
  if (jobs.status === 'fetched') {
    if (jobsData.length === 0) {
      return <Empty />;
    }
  }

  const jobByStatus = jobsData.reduce((acc, job) => {
    const status = job.status as JobStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(job);
    return acc;
  }, {} as JobByStatus);
  return <GridView jobByStatus={jobByStatus} />;
}

export default JobSection;
