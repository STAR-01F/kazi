import {Container, Paper, Typography} from '@mui/material';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';

const StatsContainer = () => {
  return (
    <Container
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '250px',
        flexDirection: 'column',
        minWidth: '350px',
        mb: 3,
      }}
    >
      <QueryStatsTwoToneIcon sx={{fontSize: '100px'}} />
      <Typography>No stats available</Typography>
    </Container>
  );
};

export default StatsContainer;
