import {Box, Container, Paper, Typography} from '@mui/material';
import GoalsPie from './components/GoalsPie';
import JobsByStatus from './components/jobsbystatus';
//import Streak from './components/streak';
import LifeTimeStatsComponent from './components/LifetimeStats';

const StatsContainer = () => {
  return (
    <Container
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '250px',
        flexDirection: 'row',
        minWidth: '325px',
        backgroundColor: '#D5D5D544',
        mb: 3,
      }}
    >
      <Box
        width={{
          xs: '100%',
          sm: '50%',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box>
          <Typography fontFamily={'Kanit'} textAlign={'center'}>
            Goals - Jobs Applied
          </Typography>
          <GoalsPie />
        </Box>
      </Box>
      <Box
        width={{
          xs: '0%',
          sm: '50%',
        }}
        display={{
          xs: 'none',
          sm: 'flex',
        }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'160px'}>
          <Typography fontFamily={'Kanit'} textAlign={'center'}>
            Breakdown
          </Typography>
          <JobsByStatus />
        </Box>
      </Box>
      <Box
        width={{
          xs: '0%',
          sm: '50%',
        }}
        display={{
          xs: 'none',
          sm: 'flex',
        }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'160px'}>
          <Typography fontFamily={'Kanit'} textAlign={'center'}>
            Lifetime Activity
          </Typography>
          <LifeTimeStatsComponent />
        </Box>
      </Box>
    </Container>
  );
};

export default StatsContainer;
