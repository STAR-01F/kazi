import {useContext} from 'react';
import {JobsContext, JobsContextType} from '../context/Jobs';

export const useJobs = (): JobsContextType => {
  const jobsContext = useContext(JobsContext);
  if (!jobsContext) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return jobsContext;
};
