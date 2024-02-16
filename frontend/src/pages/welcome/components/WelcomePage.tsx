import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Box, Button, Container, Grid, IconButton} from '@mui/material';
import BackIcon from '@components/icons/backIcon';
import NextIcon from '@components/icons/nextIcon';
import UserForm from './UserForm';
import WelcomeCard from './WelcomeCard';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {CreateProfile} from '@services/firebase/users/CreateProfile';
import User from 'src/@types/user';
import {useNavigate} from 'react-router-dom';

const WelcomePage = () => {
  const {user} = useAuth();
  const [index, setIndex] = useState(0);
  const numViews = 8; // Number of swipeable views
  const [jobStatus, setJobStatus] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobStart, setJobStart] = useState('');
  const [jobIndustry, setJobIndustry] = useState('');
  const [jobLevel, setJobLevel] = useState('');

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
  const navigate = useNavigate();
  const handleAddProfile = async () => {
    if (!user?.uid) return;
    const userProfile: Partial<User> = {
      id: user.uid,
      jobStatus: jobStatus,
      jobLocation: jobLocation,
      jobStart: jobStart,
      jobIndustry: jobIndustry,
      jobLevel: jobLevel,
    };

    const resp = await CreateProfile(userProfile);
    console.log('resp: ============>', resp);
    // check if resp is an error
    if (resp.status === 'Error') {
      return;
    }

    // redirect to the dashboard
    navigate('/');
  };

  const welcomeCards = [
    {
      title: 'Welcome to Kazi!',
      content:
        "Welcome aboard! We're thrilled to have you join Kazi, your personal assistant in crafting tailored CVs and keeping your job search organised. Let's get started on optimising your job hunt journey!",
    },
    {
      title: 'Quick Tutorial',
      content:
        "Not sure where to begin? No worries, we've got you covered! Take a quick tour to familiarise yourself with Kazi’s key features and how to make the most out of them.",
    },
    {
      title: 'Tell Me More',
      content:
        "We're here to tailor your experience to your needs. Help us understand you better by answering a few quick questions:",
    },
    {
      title: 'What is your employment status?',
      component: [
        <UserForm
          onChange={(e) => {
            setJobStatus(e.target.value);
          }}
          labels={['Employed', 'Unemployed', 'Self-Employed',]}
        />,
      ],
    },
    {
      title: 'Where would you like to work?',
      component: [
        <UserForm
          onChange={(e) => {
            setJobLocation(e.target.value);
          }}
          labels={['London', 'San-Francisco', 'Remote']}
        />,
      ],
    },
    {
      title: 'When are you looking to start your new job?',
      component: [
        <UserForm
          onChange={(e) => {
            setJobStart(e.target.value);
          }}
          labels={[
            'As soon as possible',
            'In the next year',
            "Not sure, I'd move for the right role",
          ]}
        />,
      ],
    },
    {
      title: 'What industry are you interested in?',
      component: (
        <UserForm
          onChange={(e) => {
            setJobIndustry(e.target.value);
          }}
          labels={['AI', 'Media', 'Sport']}
        />
      ),
    },
    {
      title: 'What is your job level?',
      component: (
        <>
          <UserForm
            onChange={(e) => {
              setJobLevel(e.target.value);
            }}
            labels={['Entry-Level', 'Junior', 'Mid', 'Senior']}
          />
          <Container sx={{display: 'flex', justifyContent: 'end'}}>
            <Button onClick={handleAddProfile}>Save</Button>
          </Container>
        </>
      ),
    },
  ];

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 'calc(100vh - 65px)',
        // height: '90vh',
      }}
      container
    >
      <Container
        sx={{overflow: 'hidden'}}
        component={SwipeableViews}
        index={index}
      >
        {welcomeCards.map((card, i) => (
          <WelcomeCard
            key={i}
            title={card.title}
            content={card.content}
            component={card.component}
          />
        ))}
      </Container>
      <Box
        sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          position: 'fixed',
          justifyContent: index > 0 ? 'space-between' : 'end',
          width: '100%',
          maxWidth: 'md',
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
          sx={{
            display: index < numViews - 1 ? 'flex' : 'none',
            backgroundColor: 'lightgrey',
          }}
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
