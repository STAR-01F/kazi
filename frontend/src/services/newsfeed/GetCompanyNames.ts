import {useJobs} from '@services/firebase/hooks/useJobs';

const GetCompanyNames = () => {
  const {jobs} = useJobs();
  const allJobs = jobs
    .filter(
      (j) =>
        j.status === 'Saved' ||
        j.status === 'Applied' ||
        j.status === 'Interview'
    )
    .map((j) => j.company.replace('.', '').replace('-', ''));

  return allJobs;
};

export default GetCompanyNames;
