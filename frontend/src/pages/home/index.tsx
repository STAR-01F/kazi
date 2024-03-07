import {Grid, Typography} from '@mui/material';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {getDisplayName} from '@utils/helper';
import StatsContainer from './components/Stats';
import Banner from './components/Banner';
import JobSection from './components/Job';

const Homepage = () => {
  const {user} = useAuth();
  return (
    <Grid
      id="home-page"
      container
      item
      maxWidth="lg"
      direction={'column'}
      wrap="nowrap"
      padding={{xs: '10px 20px', md: '15px 30px', lg: '20px 40px'}}
    >
      <Typography fontFamily={"Young Serif"} variant={'h4'} gutterBottom>
        Welcome, {getDisplayName(user?.displayName || '')}
      </Typography>
      <StatsContainer />
      <Banner />
      <JobSection />
    </Grid>
  );
};

export default Homepage;
