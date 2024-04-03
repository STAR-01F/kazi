import {useJobs} from '@services/firebase/hooks/useJobs';

const GetCompanyNames = () => {
  const {jobs} = useJobs();
  const allJobs = jobs
    .filter((j) => j.status === 'Saved' || j.status === 'Applied')
    .map((j) => j.company);

  return allJobs;
};

export default GetCompanyNames;
