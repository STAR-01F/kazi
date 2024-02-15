import {Grid} from '@mui/material';
import SavedJob from './components/SavedJob';
import useFetchJobs from '@hooks/useFetchJobs';
import Header from './components/Header';

const Homepage = () => {
  const jobs = useFetchJobs();
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
      <Header />
      <Grid id="home-page-jobs-container" container item gap={2}>
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
