import useFetchUserJobs from '@hooks/useFetchUserJobs';
import React, {createContext, useState} from 'react';
import {UserJob} from 'src/@types';

export interface JobsContextType {
  jobs: UserJob[];
  setJobs: React.Dispatch<React.SetStateAction<UserJob[]>>;
  loading: boolean;
}

export const JobsContext = createContext<JobsContextType | undefined>(
  undefined
);

interface JobsProviderProps {
  children: React.ReactNode;
}

export const JobsProvider = ({children}: JobsProviderProps): JSX.Element => {
  const [jobs, setJobs] = useState<UserJob[]>([]);
  const [loading, setLoading] = useState(true);
  const userJobs = useFetchUserJobs();
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
