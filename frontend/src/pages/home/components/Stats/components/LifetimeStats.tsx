import {Container, LinearProgress} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {GetUserProfileById} from '@services/firebase/userProfiles';
import {useAuth} from '@services/firebase/hooks/useAuth';
import UserProfile from 'src/@types/userProfile';
import {useState, useEffect} from 'react';
import JobStatusTallies from '@utils/tallyJobStatus';
import {BarChart} from '@mui/x-charts';
import {JobStatusCount} from 'src/@types';

const LifeTimeStatsComponent = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const {jobs, loading} = useJobs();
  const {user} = useAuth();
  const [tallyResults, setTallyResults] = useState<JobStatusCount>({});

  useEffect(() => {
    if (!user || !userProfile) return;
    const GetUserProfile = async () => {
      try {
        const resp = await GetUserProfileById(user.uid);
        if (resp.status === 'Success') {
          setUserProfile(resp.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
      }
    };
    GetUserProfile();

    const TallyRes = JobStatusTallies(jobs, userProfile);
    setTallyResults(TallyRes);
  }, [user]);

  if (loading || userProfile) {
    return (
      <Container
        sx={{
          display: {xs: 'none', sm: 'flex'},
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '90%',
          height: '180px',
          mb: 3,
        }}
      >
        <LinearProgress style={{width: '100%'}} />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: {xs: 'none', sm: 'flex'},
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '90%',
        height: '180px',
        mb: 3,
      }}
    >
      <BarChart series={[{data: [tallyResults.Saved]}]} />
    </Container>
  );
};

export default LifeTimeStatsComponent;
