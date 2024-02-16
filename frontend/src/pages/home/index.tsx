import {Box, Container, Divider, Grid, Typography} from '@mui/material';
import SavedJob from './components/SavedJob';
import JobModal from './components/JobModal';
import useFetchJobs from '@hooks/useFetchJobs';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {getDisplayName} from '@utils/helper';
import StatsContainer from './components/StatsContainer';
import type {Job} from 'src/@types';
import {Fragment} from 'react';
import jobStatus from '@repository/job.json';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
const Homepage = () => {
  const jobs = useFetchJobs();
  const {user} = useAuth();
  const jobByStatus = jobs.data
    ? jobs.data.reduce((acc, job) => {
        if (!acc[job.status as JobStatus]) {
          acc[job.status as JobStatus] = [];
        }
        acc[job.status as JobStatus].push(job);
        return acc as JobByStatus;
      }, {} as JobByStatus)
    : ({} as JobByStatus);
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
      <Box id="home-page-header" mb={3} display={'flex'}>
        <JobModal />
      </Box>
      <Grid
        id="home-page-jobs-container"
        container
        item
        gap={2}
        // maxHeight={'max-content'}
      >
        {jobStatus.status.map((statusName) => {
          const jobs = jobByStatus[statusName as JobStatus];
          return (
            jobs &&
            jobs.length > 0 && (
              <Fragment key={statusName}>
                <Typography
                  component={Container}
                  variant={'h5'}
                  gutterBottom
                  disableGutters
                >
                  {statusName}
                  <Divider />
                </Typography>
                {jobs.map((job) => (
                  <SavedJob
                    key={job.id}
                    companyName={job.company}
                    jobTitle={job.title}
                    jobID={job.id!}
                    logoPath="../src/assets/google-logo.png"
                  />
                ))}
              </Fragment>
            )
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Homepage;
