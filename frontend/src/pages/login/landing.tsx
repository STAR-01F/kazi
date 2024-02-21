import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';

export default function LandingPage() {
  return (
    <Box
      component={Grid}
      container
      md={6}
      item={true}
      sx={{
        display: {xs: 'none', sm: 'none', md: 'flex'},
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          fontWeight={600}
          color={'purple'}
        >
          kAZI
        </Typography>
        <Typography variant="h3" fontWeight={600}>
          your calling is calling
        </Typography>
      </Box>
    </Box>
  );
}
