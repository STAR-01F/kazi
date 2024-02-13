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
import SvgIconGoogle from '@components/icons/googleIcon';
import SvgIconGithub from '@components/icons/githubIcon';
import {useNavigate} from 'react-router-dom';
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from '@services/firebase/auth';
import {IconButton} from '@mui/material';

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
interface SignInErrors {
  email?: string;
  password?: string;
}
interface SignInValues {
  email?: string;
  password?: string;
}
export default function SignInSide() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<SignInErrors>({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      errors.password = 'Password is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const resp = await logInWithEmailAndPassword(
          values.email!,
          values.password!
        );
        if (resp.status === 'Error') {
          console.log(resp.message);
          setErrors({
            email: 'Failed to sign in. Please check your credentials.',
            password: 'Failed to sign in. Please check your credentials.',
          });
          return;
        }
        navigate('/');
      } catch (error) {
        setErrors({
          ...errors,
          password: 'Failed to sign in. Please check your credentials.',
        });
      }
    }
  };
  const handleSignInWithGoogle = async () => {
    const resp = await signInWithGoogle();
    if (resp.status === 'Success') {
      console.log(resp.data);
    }
  };
  const handeleSignInWithGithub = async () => {
    const resp = await signInWithGithub();
    if (resp.status === 'Success') {
      console.log(resp.data);
    }
  };
  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <Grid container component="main" width={'100%'} height={'100%'} maxWidth="xs" >
  
      <Grid item xs={12} sm={8} md={true} component={Paper} elevation={6} square
      sx={{
    
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Grid container direction="row" gap={2} justifyContent={'center'}>
              <IconButton onClick={handleSignInWithGoogle}>
                <SvgIconGoogle />
              </IconButton>
              <IconButton onClick={handeleSignInWithGithub}>
                <SvgIconGithub />
              </IconButton>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?{"  "}
                <Link onClick={handleClick} href="#" variant="body2" >
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{mt: 5}} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
