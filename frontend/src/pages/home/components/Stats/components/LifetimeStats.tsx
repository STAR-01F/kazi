import {Container, LinearProgress} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {GetUserProfileById} from '@services/firebase/userProfiles';
import {useAuth} from '@services/firebase/hooks/useAuth';
import UserProfile from 'src/@types/userProfile';
import {useState, useEffect} from 'react';
import JobStatusTallies from '@utils/tallyJobStatus';
import {PieChart} from '@mui/x-charts';
import {JobStatusCount} from 'src/@types';

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
          const TallyRes = await JobStatusTallies(jobs, resp.data);
          setTallyResults(TallyRes);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
      }
    };
    GetUserProfile();
  }, [user, jobs]);

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

  return (
    <PieChart
      colors={['#7B4B94', '#7D82B8', '#CA3CFF', '#C9E4E7', '#B4A0E5']}
      height={190}
      width={160}
      tooltip={{trigger: jobs.length === 0 ? 'none' : 'item'}}
      series={[
        {
          data: [
            {
              label: 'saved',
              value:
                tallyResults?.Saved +
                tallyResults?.Applied +
                tallyResults?.Interview +
                tallyResults?.Rejected,
            },
            {
              label: 'applied',
              value:
                tallyResults?.Applied +
                tallyResults?.Interview +
                tallyResults?.Rejected,
            },
            {
              label: 'interview',
              value: tallyResults?.Interview + tallyResults?.Rejected,
            },
            {label: 'rejected', value: tallyResults!.Rejected},
          ],
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          highlightScope: {faded: 'global', highlighted: 'item'},
          faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},

          cx: '137%',
          cy: '50%',
        },
      ]}
      slotProps={{
        legend: {hidden: true},
      }}
    />
  );
  //   return (
  //     <Container
  //       id="boxxy"
  //       sx={{
  //         marginLeft: '-50px',
  //         fontWeight: '900',
  //       }}
  //     >
  //       <BarChart
  //         dataset={[
  //           {
  //             month: 'saved',
  //             data:
  //               tallyResults?.Saved +
  //               tallyResults?.Applied +
  //               tallyResults?.Interview +
  //               tallyResults?.Rejected,
  //           },
  //           {
  //             month: 'applied',
  //             data:
  //               tallyResults?.Applied +
  //               tallyResults?.Interview +
  //               tallyResults?.Rejected,
  //           },
  //           {
  //             month: 'interview',
  //             data: tallyResults?.Interview + tallyResults?.Rejected,
  //           },
  //           {month: 'rejected', data: tallyResults!.Rejected},
  //         ]}
  //         yAxis={[{scaleType: 'band', dataKey: 'month'}]}
  //         series={[{dataKey: 'data'}]}
  //         margin={{left: 100}}
  //         layout="horizontal"
  //         width={270}
  //         height={180}
  //       />
  //     </Container>
  //   );
};

export default LifeTimeStatsComponent;
