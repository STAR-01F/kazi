import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import SvgIconGoogle from '@components/icons/googleIcon';
import SvgIconGithub from '@components/icons/githubIcon';
import {useNavigate} from 'react-router-dom';
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from '@services/firebase/auth';
import {IconButton} from '@mui/material';
import Copyright from '@components/copyright/copyright';
import {useFeedback} from '@hooks/useFeeback';
import {LoadingButton} from '@mui/lab';

interface SignInErrors {
  email?: string;
  passError?: string;
}

interface SignInValues {
  email?: string;
  password?: string;
}

export default function SignInSide() {
  const navigate = useNavigate();
  const {setFeedback} = useFeedback();
  const [errors, setErrors] = React.useState<SignInErrors>({});
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const values: SignInValues = {
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    };
    const errors: SignInErrors = {};

    // Validate email
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    // Validate password
    if (!values.password) {
      errors.passError = 'Password is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const resp = await logInWithEmailAndPassword(
          values.email!,
          values.password!
        );
        if (resp.status === 'Error') {
          const errorMessage =
            resp.message == 'auth/invalid-credential'
              ? 'Invalid credentials'
              : resp.message;
          setErrors({
            email: errorMessage as string,
            passError: errorMessage as string,
          });
          setLoading(false);
          return;
        }
        setFeedback({
          type: 'success',
          message: 'Successfully signed in',
        });
        setLoading(false);
        navigate('/verify-email');
      } catch (error) {
        setLoading(false);
        setErrors({
          ...errors,
          passError: 'Failed to sign in. Please check your credentials.',
        });
      }
    }
    setLoading(false);
  };
  const handleSignInWithGoogle = async () => {
    const resp = await signInWithGoogle();
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message as string,
      });
      return;
    }
    setFeedback({
      type: 'error',
      message: 'Failed to authenticate with Google',
    });
    console.error(resp.message);
  };
  const handeleSignInWithGithub = async () => {
    const resp = await signInWithGithub();
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message as string,
      });
      return;
    }
    setFeedback({
      type: 'error',
      message: 'Failed to authenticate with Github',
    });
    console.error(resp.message);
  };

  const handleNavToSignUp = () => {
    navigate('/signup');
  };

  const resetPassword = () => {
    navigate('/password-reset');
  };

  return (
    <>
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
              width: '85%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{mt: 1, boxSizing: 'border-box'}}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={() => {
                  if (errors.passError) {
                    setErrors({
                      ...errors,
                      passError: undefined,
                    });
                  }
                }}
                error={!!errors.passError}
                helperText={errors.passError}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 2, mb: 2}}
                size="large"
                loading={loading}
              >
                Sign In
              </LoadingButton>
              <Grid container direction="row" gap={2} justifyContent={'center'}>
                <IconButton onClick={handleSignInWithGoogle}>
                  <SvgIconGoogle />
                </IconButton>
                <IconButton onClick={handeleSignInWithGithub}>
                  <SvgIconGithub />
                </IconButton>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {xs: 'column', md: 'row'},
                  justifyContent: {xs: 'centre', md: 'space-between'},
                  alignItems: {xs: 'center'},
                  fontSize: {xs: '12px', md: '14px'},
                }}
              >
                <Box>
                  <Link onClick={resetPassword} href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <Box>
                  Don't have an account?{'  '}
                  <Link onClick={handleNavToSignUp} href="#" variant="body2">
                    {'Sign Up'}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
          <Copyright sx={{mt: 5}} href={'https://github.com/STAR-01F/'} />
        </Grid>
      </Grid>
    </>
  );
}
