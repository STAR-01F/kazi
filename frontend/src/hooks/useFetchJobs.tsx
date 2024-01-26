import { useState, useEffect } from 'react';
import { Job } from 'src/@types';

const useFetchJobs = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<Job[]>();

  useEffect(() => {

    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await fetch(
          `${import.meta.env.VITE_JOB_API}`
        );
        const responseData = await response.json();
        setData(responseData);
        setStatus('fetched');
      } catch (error) {
        setStatus('error');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { status, data };
};

export default useFetchJobs;
