import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Copyright from '@components/copyright/copyright';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useEffect, useState} from 'react';
import {useFeedback} from '@hooks/useFeeback';
import LoadingButton from '@mui/lab/LoadingButton';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const [loading, setLoading] = useState(false);

  console.log('user', user);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      // return;
    }
    if (user?.emailVerified) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await user?.reload();
    if (user?.emailVerified) {
      navigate('/');
    } else {
      setFeedback({
        type: 'error',
        message: 'Email not verified',
      });
    }
    setLoading(false);
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  return (
    <Grid
      container
      component="main"
      width={'100%'}
      height={'100%'}
      maxWidth="xs"
    >
      <Grid
        item
        sm={12}
        md={true}
        component={Paper}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <MailOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify your email
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mt: 1, boxSizing: 'border-box'}}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography align="center">
                  Check your email for a link to verify your email address.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{mt: 3, mb: 3}}
                  loading={loading}
                >
                  <Typography pr={2}>Dashboard</Typography>
                  <ArrowForwardIcon fontSize="small" />
                </LoadingButton>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                {' '}
                <Link onClick={handleGoToSignIn} href="#">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 5}} href={'https://github.com/STAR-01F/'} />
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
