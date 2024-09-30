import {Container, LinearProgress} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {GetUserProfileById} from '@services/firebase/userProfiles';
import {useAuth} from '@services/firebase/hooks/useAuth';
import UserProfile from 'src/@types/userProfile';
import {useState, useEffect} from 'react';
import JobStatusTallies from '@utils/tallyJobStatus';
import {ResponsiveChartContainer, BarPlot} from '@mui/x-charts';
import {JobStatusCount} from 'src/@types';

const LifeTimeStatsComponent = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const {jobs, loading} = useJobs();
  const {user} = useAuth();
  const [_tallyResults, setTallyResults] = useState<JobStatusCount>({});

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
    console.log('erfrf');
    console.log('tr1', TallyRes);
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

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  return (
    <ResponsiveChartContainer
      // width={250}
      height={200}
      series={[{data: uData, label: 'uv', type: 'bar'}]}
      xAxis={[{scaleType: 'band', data: xLabels}]}
    >
      <BarPlot />
    </ResponsiveChartContainer>
    // <Container
    //   sx={{
    //     display: {xs: 'none', sm: 'flex'},
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     minWidth: '90%',
    //     height: '170px',
    //     mb: 3,
    //   }}
    // >

    //   <BarChart
    //      dataset={[tallyResults as {}]}
    //     yAxis={[{scaleType: 'band', dataKey:'A'}]}
    //     series={[{data: [220]}, {data: [220]}, {data: [400]}]}

    //     layout="horizontal"        width={600}
    //     height={700}
    //   />
    // </Container>
  );
};

export default LifeTimeStatsComponent;
