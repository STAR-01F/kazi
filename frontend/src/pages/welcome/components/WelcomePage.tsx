import {useState} from 'react';
import {Button, Container, Grid, IconButton} from '@mui/material';
import BackIcon from '@components/icons/backIcon';
import NextIcon from '@components/icons/nextIcon';
import UserForm from './UserForm';
import WelcomeCard from './WelcomeCard';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

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
  const handleAddProfile = async () => {
    if (!user?.uid) return;
    const userProfile = {
      id: user.uid,
      jobStatus: jobStatus,
      jobLocation: jobLocation,
      jobStart: jobStart,
      jobIndustry: jobIndustry,
      jobLevel: jobLevel,
    };

    console.log('userProfile: ============>', userProfile);
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
          labels={['Employed', 'Unemployed', 'Self-Employed']}
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
            <Button
              disabled={index == 8 && !jobLevel}
              onClick={handleAddProfile}
            >
              Save
            </Button>
          </Container>
        </>
      ),
    },
  ];

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      maxWidth={"md"}
      container
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
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        initialSlide={0}
      >
        <WelcomeCard
          title={welcomeCards[index].title}
          content={welcomeCards[index].content}
          component={welcomeCards[index].component}
        />
      </Swiper>
      <IconButton
        sx={{
          display: index < numViews - 1 ? 'flex' : 'none',
          backgroundColor: 'lightgrey',
        }}
        onClick={handleNext}
        color="primary"
        aria-label="next"
        disabled={
          (index == 3 && !jobStatus) ||
          (index == 4 && !jobLocation) ||
          (index == 5 && !jobStart) ||
          (index == 6 && !jobIndustry) ||
          (index == 7 && !jobLevel)
        }
      >
        <NextIcon />
      </IconButton>
      {/* </Box> */}
    </Grid>
  );
};

export default WelcomePage;
