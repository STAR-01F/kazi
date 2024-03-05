import {Container, Paper} from '@mui/material';
import Goal from './components/goal';
import AllJobs from './components/alljobs';

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
        minWidth: '350px',
        gap: 10,
        mb: 3,
      }}
    >
        <Goal />
        <AllJobs />
    </Container>
  );
};

export default StatsContainer;
