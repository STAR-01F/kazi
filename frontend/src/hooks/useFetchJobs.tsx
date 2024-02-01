import {useState, useEffect} from 'react';
import {Job} from 'src/@types';

const useFetchJobs = (jobId: string = '') => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<Job[]>();

  const link = jobId
    ? `${import.meta.env.VITE_JOB_API}?jobid=${jobId}`
    : import.meta.env.VITE_JOB_API;

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await fetch(link);
        const responseData: Job[] | Job = await response.json();
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          setData([responseData]);
        }
      } catch (error) {
        setStatus('error');
        console.error('Error fetching data:', error);
      } finally {
        setStatus('fetched');
      }
    };

    fetchData();
  }, [link]);

  return {status, data};
};

export default useFetchJobs;
