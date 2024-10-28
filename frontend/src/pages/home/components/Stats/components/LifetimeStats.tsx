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

  function getNum(val: any): number {
    val = +val || 0;
    return val;
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
                getNum(tallyResults?.Saved) +
                getNum(tallyResults?.Applied) +
                getNum(tallyResults?.Interview) +
                getNum(tallyResults?.Rejected),
            },
            {
              label: 'applied',
              value:
                getNum(tallyResults?.Applied) +
                getNum(tallyResults?.Interview) +
                getNum(tallyResults?.Rejected),
            },
            {
              label: 'interview',
              value:
                getNum(tallyResults?.Interview) +
                getNum(tallyResults?.Rejected),
            },
            {label: 'rejected', value: getNum(tallyResults!.Rejected)},
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
};

export default LifeTimeStatsComponent;
