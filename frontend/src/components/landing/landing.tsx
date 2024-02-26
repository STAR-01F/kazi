import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import logo from '../../assets/kazi-logo.png';

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
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            paddingBottom: '20px',
          }}
        >
          <img src={logo} alt="Kazi Logo" />
        </Box>
        <Typography variant="h6" fontWeight={300}>Simplify ∙ Track ∙ Succeed
</Typography>
      </Box>
    </Box>
  );
}
