import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import logo from '../../assets/Kazi.svg';

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Box
            component={'img'}
            src={logo}
            alt="Kazi Logo"
            sx={{
              maxWidth: '360px',
            }}
          />
        </Box>
        <Typography variant="h5">Simplify ∙ Track ∙ Succeed</Typography>
      </Box>
    </Box>
  );
}
