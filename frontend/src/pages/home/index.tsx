import {Grid, Typography} from '@mui/material';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {getDisplayName} from '@utils/helper';
import StatsContainer from './components/Stats';
import Banner from './components/Banner';
import JobSection from './components/Job';
import {Tab, Tabs} from '@mui/material';
import FeedContainer from './components/NewsFeed';
import {useState} from 'react';

const Homepage = () => {
  const {user} = useAuth();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange = (_e: any, tabIndex: any) => {
    setCurrentTabIndex(tabIndex);
  };

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
      <Typography fontFamily={'Young Serif'} variant={'h4'} gutterBottom>
        Welcome, {getDisplayName(user?.displayName || '')}
      </Typography>
      <Tabs value={currentTabIndex} onChange={handleTabChange}>
        <Tab label="Feed" />
        <Tab label="Metrics" />
      </Tabs>
      {currentTabIndex === 0 && <FeedContainer />}
      {currentTabIndex === 1 && <StatsContainer />}

      <Banner />
      <JobSection />
    </Grid>
  );
};

export default Homepage;
