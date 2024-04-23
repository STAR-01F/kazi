import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Button} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Copyright from '@components/copyright/copyright';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useEffect, useState} from 'react';
import {useFeedback} from '@hooks/useFeeback';
// import LoadingButton from '@mui/lab/LoadingButton';
import {sendEmailVerificationCode} from '@services/firebase/auth';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const [loading, setLoading] = useState(false);
  console.log(loading);
  // create a resend timer for the resend button
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

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

  const handleResend = async () => {
    const resp = await sendEmailVerificationCode(user);
    if (resp.status === 'Error') {
      setFeedback({
        type: 'error',
        message: 'Failed to send verification email',
      });
      return;
    }
    setResendTimer(60);
    setFeedback({
      type: 'success',
      message: 'Verification email sent',
    });
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
              <Grid container item xs={12} flexDirection={'column'}>
                <Grid item>
                  <Typography align="center" mb={3}>
                    Check your email for the verification link sent to
                    <Typography fontWeight={'bold'} align="center">
                      {user?.email}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  flexDirection={'row'}
                  gap={'5px'}
                  justifyContent={'center'}
                  alignContent={'center'}
                  mb={3}
                >
                  <Typography
                    align="center"
                    width={'max-content'}
                    color={'#5836f7'}
                  >
                    Not in inbox or spam folder?
                  </Typography>
                  <Link
                    onClick={resendTimer <= 0 ? handleResend : () => {}}
                    color={resendTimer <= 0 ? 'primary' : 'textSecondary'}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {resendTimer <= 0 ? 'Resend' : `${resendTimer}s`}
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                // type="submit"
                // name="handleSubmit"
                // fullWidth
                // variant="contained"
                // size="large"
                // sx={{mt: 3, mb: 3}}
                // loading={loading}
                >
                  <Typography pr={2}>Dashboard</Typography>
                  <ArrowForwardIcon fontSize="small" />
                </Button>
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
