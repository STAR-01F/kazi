import useFetchJobs from '@hooks/useFetchJobs';
import React, {createContext, useState} from 'react';
import {Job} from 'src/@types';

export interface JobsContextType {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  loading: boolean;
}

export const JobsContext = createContext<JobsContextType | undefined>(
  undefined
);

interface JobsProviderProps {
  children: React.ReactNode;
}

export const JobsProvider = ({children}: JobsProviderProps): JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const userJobs = useFetchJobs();
  if (userJobs.status === 'fetched' && loading) {
    setJobs(userJobs.data || []);
    setLoading(false);
  }
  return (
    <JobsContext.Provider value={{jobs, setJobs, loading}}>
      {children}
    </JobsContext.Provider>
  );
};
