import {useState, useEffect} from 'react';
import {Job} from 'src/@types';
import { useAuth } from '@services/firebase/hooks/useAuth';


const useFetchJobsByUID = () => {

  const { user } = useAuth(); 
  const UID = user?.uid;
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<Job[]>();
  const link = `${import.meta.env.VITE_JOB_API}?uid=${UID}`

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await fetch(link);
        const responseData: Job[] | Job = await response.json();
        console.log('resp data:', responseData);
        if (responseData === null){
          setData([])
          return
        }
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          setData([responseData]);
        }
      } catch (error) {
        setStatus('error');
        console.error('Error fetching data by userID:', error);
      } finally {
        setStatus('fetched');
      }
    };

    fetchData();
  }, []);

  return {status, data};
};

export default useFetchJobsByUID;
