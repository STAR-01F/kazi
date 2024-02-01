import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SvgIconGoogle from '@components/icons/googleIcon';
import SvgIconApple from '@components/icons/appleIcon';
import SvgIconGithub from '@components/icons/githubIcon';
import {useNavigate} from 'react-router-dom';
import {registerWithEmailAndPassword} from '../../services/firebase/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/arnold-mutungi/">
        TrackAI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const resp = await registerWithEmailAndPassword(
          values.firstname!,
          values.lastname!,
          values.email!,
          values.password!
        );
        console.info(resp);
      } catch (error) {
        console.error(error);
        setErrors({
          ...errors,
          password: 'Failed to sign up. Please check your credentials.',
        });
      }
    }
  };

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container direction="row" gap={2} justifyContent={'center'}>
            <Button>
              <SvgIconGoogle />
            </Button>
            <Button>
              <SvgIconApple />
            </Button>
            <Button>
              <SvgIconGithub />
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={handleClick} href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 5}} />
    </Container>
  );
}
