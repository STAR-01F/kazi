import {Box, Container, Paper} from '@mui/material';
import Goal from './components/goal';
import JobsByStatus from './components/jobsbystatus';

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
          <Goal />
        </Box>
      </Box>
      <Box
        width={{
          xs: '0%',
          md: '50%',
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <JobsByStatus />
      </Box>
    </Container>
  );
};

export default StatsContainer;
