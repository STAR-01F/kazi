import {Grid, Typography} from '@mui/material';
import SavedJob from './components/SavedJob';
import useFetchJobs from '@hooks/useFetchJobs';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {getDisplayName} from '@utils/helper';
import StatsContainer from './components/StatsContainer';
import Banner from './components/Banner';

const Homepage = () => {
  const jobs = useFetchJobs();
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
      <Typography variant={'h4'} gutterBottom>
        Welcome, {getDisplayName(user?.displayName || '')}
      </Typography>
      <StatsContainer />
      <Banner />
      <Grid
        id="home-page-jobs-container"
        container
        item
        gap={2}
        // maxHeight={'max-content'}
      >
        {jobs.data &&
          jobs.data.map((job) => {
            return (
              <SavedJob
                key={job.id}
                companyName={job.company}
                jobTitle={job.title}
                jobID={job.id!}
                logoPath="../src/assets/google-logo.png"
              />
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Homepage;
