import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Box, Button, Grid, IconButton} from '@mui/material';
import BackIcon from '@components/icons/backIcon';
import NextIcon from '@components/icons/nextIcon';
import UserForm from './UserForm';
import WelcomeCard from './WelcomeCard';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {CreateProfile} from '@services/firebase/users/CreateProfile';
import User from 'src/@types/user';

const WelcomePage = () => {
  const {user} = useAuth();
  const [index, setIndex] = useState(0);
  const numViews = 8; // Number of swipeable views
  // const [jobStatus, setJobStatus] = useState('');
  // const [jobLocation, setJobLocation] = useState('');
  // const [jobStart, setJobStart] = useState('');
  // const [jobIndustry, setJobIndustry] = useState('');
  // const [jobLevel, setJobLevel] = useState('');

  const handleBack = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (index < numViews - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handleAddProfile = async () => {
    if (!user?.uid) return;
    const userProfile: Partial<User> = {
      id: user.uid,
      // jobStatus: jobStatus,
      // jobLocation: jobLocation,
      // jobStart: jobStart,
      // jobIndustry: jobIndustry,
      // jobLevel: jobLevel,
    };

    const resp = await CreateProfile(userProfile);
    console.log('resp: ============>', resp);
    // check if resp is an error
    if (resp.status === 'Error') {
      return;
    }
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      container
    >
      <SwipeableViews index={index}>
        <Button onClick={handleAddProfile} style={{display: 'block'}}>Button</Button>
        <WelcomeCard
          title={'Welcome to Kazi!'}
          content={
            "Welcome aboard! We're thrilled to have you join Kazi, your personal assistant in crafting tailored CVs and keeping your job search organised. Let's get started on optimising your job hunt journey!"
          }
        />
        <WelcomeCard
          title="Quick Tutorial"
          content={
            "Not sure where to begin? No worries, we've got you covered! Take a quick tour to familiarise yourself with Kazi’s key features and how to make the most out of them."
          }
        />
        <WelcomeCard
          title="Tell Me More"
          content={
            "We're here to tailor your experience to your needs. Help us understand you better by answering a few quick questions:"
          }
        />
        <WelcomeCard
          title="Tell Me More"
          content={'What is your employment status?'}
          component={
            <UserForm labels={['Employed', 'Unemployed', 'Self-Employed']} />
          }
        />
        <WelcomeCard
          title="Tell Me More"
          content={'Where would you like to work?'}
          component={
            <UserForm labels={['London', 'San-Francisco', 'Remote']} />
          }
        />
        <WelcomeCard
          title="Tell Me More"
          content={'When are you looking to start your new job?'}
          component={
            <UserForm
              labels={[
                'As soon as possible',
                'In the next year',
                "Not sure, I'd move for the right role",
              ]}
            />
          }
        />
        <WelcomeCard
          title="Tell Me More"
          content={'Do you have any favourite industries in mind?'}
          component={<UserForm labels={['AI', 'Media', 'Sport']} />}
        />
        <WelcomeCard
          title="Tell Me More"
          content={'What level of roles would you like to see?'}
        />
      </SwipeableViews>
      <Box
        sx={{
          display: 'flex',
          justifyContent: index > 0 ? 'space-between' : 'end',
          padding: '20px',
          width: '100%',
        }}
      >
        <IconButton
          sx={{
            display: index > 0 ? 'flex' : 'none',
            backgroundColor: 'lightgrey',
          }}
          onClick={handleBack}
          color="primary"
          aria-label="back"
        >
          <BackIcon />
        </IconButton>
        <IconButton
          sx={{backgroundColor: 'lightgrey'}}
          onClick={handleNext}
          color="primary"
          aria-label="next"
        >
          <NextIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default WelcomePage;
