import {Container, LinearProgress} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {GetUserProfileById} from '@services/firebase/userProfiles';
import {useAuth} from '@services/firebase/hooks/useAuth';
import UserProfile from 'src/@types/userProfile';
import {useState, useEffect} from 'react';
import JobStatusTallies from '@utils/tallyJobStatus';
import {BarChart} from '@mui/x-charts';
import {JobStatusCount} from 'src/@types';
//import {useProfile} from '@services/firebase/hooks/useProfile';

const LifeTimeStatsComponent = () => {
  const [_userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const {jobs, loading} = useJobs();
  const {user} = useAuth();
  const [tallyResults, setTallyResults] = useState<JobStatusCount>({});

  useEffect(() => {
    if (!user) return;
    const GetUserProfile = async () => {
      try {
        const resp = await GetUserProfileById(user.uid);
        if (resp.status === 'Success') {
          setUserProfile(resp.data);
          const TallyRes = JobStatusTallies(jobs, resp.data);
          setTallyResults(TallyRes);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
      }
    };
    GetUserProfile();
    console.log('TRES', tallyResults);
  }, [user]);

  if (loading) {
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

  const keys = Object.keys(tallyResults);
  console.log('keys -->', keys);
  const values = Object.values(tallyResults);
  console.log('values', values);

  //   const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  //   const xLabels = [
  //     'Page A',
  //     'Page B',
  //     'Page C',
  //     'Page D',
  //     'Page E',
  //     'Page F',
  //     'Page G',
  //   ];

  function valueFormatter(value: number | null) {
    return `${value} jobs`;
  }

  return (
    <Container
      id="boxxy"
      sx={{
        marginLeft: '-50px',
      }}
    >
      <BarChart
        dataset={[
          {month: 'saved', data: 100},
          {month: 'applied', data: 150},
          {month: 'interview', data: 70},
        ]}
        yAxis={[{scaleType: 'band', dataKey: 'month'}]}
        series={[{dataKey: 'data', valueFormatter}]}
        margin={{left: 100}}
        layout="horizontal"
        width={270}
        height={180}
      />
    </Container>
  );
};

export default LifeTimeStatsComponent;
