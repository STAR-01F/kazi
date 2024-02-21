import {useAuth} from '@services/firebase/hooks/useAuth';
import {GetProfileByUserID} from '@services/firebase/users/GetUser';
import {useState, useEffect} from 'react';
import User from 'src/@types/user';

const useFetchProfile = (userid: string = '') => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<User[]>();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await GetProfileByUserID(userid);
        console.log("response-------------->", response);
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
        setStatus('fetched');
      }
    };
    fetchData();
  }, [user, userid]);

  return {status, data};
};

export default useFetchProfile;
