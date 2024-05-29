import {Container, Box, Typography} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ErrorButton from './components';

const ErrorPage = () => {
  return (
    <Container
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
      }}
    >
      <Container
        sx={{
          height: {xs: '25%', md: '50%'},
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            height: '50%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: '900',
              fontSize: {xs: '5rem', md: '12rem'},
              fontFamily: 'sans-serif',
              backgroundcolor: 'primary',
              backgroundImage: `linear-gradient(45deg, #5514B4, #5836f7)`,
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Oops!
          </Typography>
        </Box>
        <Box
          sx={{
            height: '30%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: '900',
              fontFamily: 'sans-serif',
              fontSize: {xs: '0.7rem', md: '1.2rem'},
            }}
          >
            404 - PAGE NOT FOUND
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'sans-serif',
              fontSize: {xs: '0.7rem', md: '1.2rem'},
            }}
          >
            Sorry, we can't seem to find the page you're looking for{' '}
            <SentimentVeryDissatisfiedIcon />
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <ErrorButton />
        </Box>
      </Container>
    </Container>
  );
};

export default ErrorPage;
