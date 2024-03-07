import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import SvgIconGoogle from '@components/icons/googleIcon';
import SvgIconGithub from '@components/icons/githubIcon';
import {useNavigate} from 'react-router-dom';
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from '@services/firebase/auth';
import {IconButton} from '@mui/material';
import Paper from '@mui/material/Paper';
import Copyright from '@components/copyright/copyright';
import {useFeedback} from '@hooks/useFeeback';

interface SignUpErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

interface SignUpValues {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export default function SignUp() {
  const {setFeedback} = useFeedback();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<SignUpErrors>({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: SignUpValues = {
      firstname: data.get('firstName')?.toString(),
      lastname: data.get('lastName')?.toString(),
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    };
    const errors: SignUpErrors = {};

    // Validate username
    if (!values.firstname) {
      errors.firstname = 'Username is required *';
    }

    // Validate email
    if (!values.email) {
      errors.email = 'Email is required *';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    // Validate password
    if (!values.password) {
      errors.password = 'Password is required *';
    } else if (values.password.length <= 8) {
      errors.password = 'Password must be more than 8 characters';
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const resp = await registerWithEmailAndPassword(
          values.firstname!,
          values.lastname!,
          values.email!,
          values.password!
        );
        if (resp.status === 'Error') {
          console.error(resp.message);
          setErrors({
            email: resp.message as string,
            password: resp.message as string,
          });
          return;
        }
        setFeedback({
          type: 'success',
          message: 'Successfully signed up',
        });
        navigate('/');
      } catch (error) {
        console.error(error);
        setErrors({
          ...errors,
          password: 'Failed to sign up. Please check your credentials.',
        });
      }
    }
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
    console.error(resp.message);
    setFeedback({
      type: 'error',
      message: 'Failed to authenticate with Google',
    });
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
    console.error(resp.message);
    setFeedback({
      type: 'error',
      message: 'Failed to authenticate with GitHub',
    });
  };
  const handleClick = () => {
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mt: 1, boxSizing: 'border-box'}}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={() => {
                    if (errors.firstname) {
                      setErrors({
                        ...errors,
                        firstname: undefined,
                      });
                    }
                  }}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={() => {
                    if (errors.lastname) {
                      setErrors({
                        ...errors,
                        lastname: undefined,
                      });
                    }
                  }}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={() => {
                    if (errors.password) {
                      setErrors({
                        ...errors,
                        password: undefined,
                      });
                    }
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            <Grid container direction="row" gap={2} justifyContent={'center'}>
              <IconButton onClick={handleSignInWithGoogle}>
                <SvgIconGoogle />
              </IconButton>
              <IconButton onClick={handeleSignInWithGithub}>
                <SvgIconGithub />
              </IconButton>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                Already have an account?{' '}
                <Link onClick={handleClick} href="#" variant="body2">
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
}
