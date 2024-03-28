import {useJobs} from '@services/firebase/hooks/useJobs';

const GetCompanyNames = () => {
  const {jobs} = useJobs();
  const allJobs = jobs.map((j) => j.company);
  return allJobs;
};

export default GetCompanyNames;
