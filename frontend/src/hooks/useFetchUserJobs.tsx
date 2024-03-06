import {useAuth} from '@services/firebase/hooks/useAuth';
import {GetUserJobsByUserID} from '@services/firebase/userJobs';
import {useState, useEffect} from 'react';
import {UserJob} from 'src/@types';

const useFetchUserJobs = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<UserJob[]>();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await GetUserJobsByUserID(user.uid);

        if (response.status === 'Success') {
          setData(response.data);
          return;
        }
        setStatus('error');
      } catch (error) {
        setStatus('error');
        console.error('Error fetching data:', error);
      } finally {
        setStatus('fetched');
      }
    };
    fetchData();
  }, [user]);

  return {status, data};
};

export default useFetchUserJobs;
