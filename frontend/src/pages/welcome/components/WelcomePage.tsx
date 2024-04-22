import {CSSProperties, useState} from 'react';
import {Button, Container} from '@mui/material';
import UserForm from './UserForm';
import WelcomeCard from './WelcomeCard';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useNavigate} from 'react-router-dom';
import {UpdateUserPreferences} from '@services/firebase/userProfiles/Update';

const WelcomePage = () => {
  const [whyKazi, setWhyKazi] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [jobsTarget, setJobsTarget] = useState('');
  const {user} = useAuth();
  const navigate = useNavigate();

  const handleWelcomeSubmit = async () => {
    if (!user?.uid) return;
    const userPreferences = {
      whyKazi: whyKazi,
      jobStatus: jobStatus,
      jobsTarget: jobsTarget,
    };

    const updatePreferences = await UpdateUserPreferences(
      user.uid,
      userPreferences
    );

    if (updatePreferences.status === 'Success') {
      navigate('/');
    }
  };

  const welcomeCards = [
    {
      title: 'Welcome to Kazi!',
      content:
        "Welcome aboard! We're thrilled to have you join Kazi, your personal assistant in crafting tailored CVs and keeping your job search organised. Let's get started on optimising your job hunt journey!",
    },
    // {
    //   title: 'Quick Tutorial',
    //   content:
    //     "Not sure where to begin? No worries, we've got you covered! Take a quick tour to familiarise yourself with Kazi’s key features and how to make the most out of them.",
    // },
    {
      title: 'Tell Me More',
      content:
        "We're here to tailor your experience to your needs. Help us understand you better by answering a few quick questions",
    },
    {
      title: 'Why do you want to use Kazi?',
      component: [
        <UserForm
          key="whyKazi"
          onChange={(e) => {
            setWhyKazi(e.target.value);
          }}
          labels={[
            'Organise job applications',
            'Prepare for interviews',
            'Search for jobs',
          ]}
        />,
      ],
    },
    {
      title: 'What is your employment status?',
      component: [
        <UserForm
          key="jobStatus"
          onChange={(e) => {
            setJobStatus(e.target.value);
          }}
          labels={['Employed', 'Unemployed', 'Self-Employed']}
        />,
      ],
    },
    {
      title: 'How many jobs would you like to apply to each week?',
      component: [
        <UserForm
          key="jobsTarget"
          onChange={(e) => {
            setJobsTarget(e.target.value);
          }}
          labels={['3 - Regular', '5 - Serious', '10 - Intense']}
        />,
      ],
    },
    {
      title: `And that's it`,
      content: 'You are ready to save, track and apply to your favourite jobs!',
      component: (
        <Button
          size="large"
          variant="outlined"
          sx={{mt: '10px'}}
          onClick={handleWelcomeSubmit}
        >
          Go to dashboard
        </Button>
      ),
    },
  ];

  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={
          {
            '--swiper-pagination-color': '#836FFF',
            '--swiper-navigation-color': '#836FFF',
          } as CSSProperties
        }
      >
        {welcomeCards.map((card, ind) => {
          return (
            <SwiperSlide
              key={ind}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Container>
                <WelcomeCard
                  title={card.title}
                  content={card.content}
                  component={card.component}
                ></WelcomeCard>
              </Container>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default WelcomePage;
