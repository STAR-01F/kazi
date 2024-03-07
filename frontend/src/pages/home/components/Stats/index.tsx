import {Box, Container, Paper, Typography} from '@mui/material';
import Goal from './components/goal';
import JobsByStatus from './components/jobsbystatus';
import Streak from './components/streak';

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
        // gap: 10,
        mb: 3,
      }}
    >
      <Box
        width={{
          xs: '100%',
          md: '50%',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'160px'}>
          <Typography>Goals</Typography>
          <Goal />
        </Box>
      </Box>
      <Box
        width={{
          xs: '0%',
          md: '50%',
        }}
        display={{
          xs: 'none',
          md: 'flex',
        }}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Typography>Breakdown</Typography>
        <JobsByStatus />
      </Box>
      <Box
        width={{
          xs: '0%',
          md: '50%',
        }}
        display={{
          xs: 'none',
          md: 'flex',
        }}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Typography>Streak</Typography>
        <Streak/>
      </Box>
    </Container>
  );
};

export default StatsContainer;
