import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Copyright from '@components/copyright/copyright';
import {sendPasswordReset} from '@services/firebase/auth';
import {useFeedback} from '@hooks/useFeeback';

interface ResetPasswordErrors {
  email?: string;
  password?: string;
}

//

const PasswordReset = () => {
  const navigate = useNavigate();
  const {setFeedback} = useFeedback();
  const [errors, setErrors] = React.useState<ResetPasswordErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = event.currentTarget.email.value;
    if (!email) {
      setErrors({
        ...errors,
        email: 'Email is required',
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({
        ...errors,
        email: 'Email address is invalid',
      });
      return;
    }
    await sendPasswordReset(email);
    setFeedback({
      type: 'success',
      message: 'Password reset email sent successfully',
    });
    // navigate('/signin');
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mt: 1, boxSizing: 'border-box'}}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  Enter your account's verified email address and we will send
                  you a password reset link.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={() => {
                    if (errors.email) {
                      setErrors({
                        ...errors,
                        email: undefined,
                      });
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{mt: 2, mb: 2}}
                >
                  Send Password Reset Email
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                {' '}
                <Link onClick={handleGoToSignIn} href="#" variant="body2">
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

export default PasswordReset;
