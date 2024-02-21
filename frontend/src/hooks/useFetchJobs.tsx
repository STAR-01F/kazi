import {useAuth} from '@services/firebase/hooks/useAuth';
import {GetJobByJobID, GetJobsByUserID} from '@services/firebase/jobs';
import {useState, useEffect} from 'react';
import {Job} from 'src/@types';

const useFetchJobs = (jobid: string = '') => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<Job[]>();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setStatus('fetching');
      try {
        if (user.uid && jobid) {
          const response = await GetJobByJobID(jobid);
          if (response.status === 'Success') {
            setData([response.data]);
            return;
          }
        }
        const response = await GetJobsByUserID(user.uid);
        if (response.status === 'Success') {
          setData(response.data);
          return;
        }
        setStatus('error');
        console.error('Error fetching data:', response.message);
      } catch (error) {
        setStatus('error');
        console.error('Error fetching data:', error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('fetched');
      }
    };
    fetchData();
  }, [jobid, user]);

  return {status, data};
};

export default useFetchJobs;
