import useFetchJobs from '@hooks/useFetchJobs';
import {Job} from 'src/@types';
import GridView from './GridView';
import {Box, Container, Grid, Skeleton, Typography} from '@mui/material';
import {Fragment} from 'react';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
function JobSection() {
  const jobs = useFetchJobs();
  const jobByStatus = jobs.data
    ? jobs.data.reduce((acc, job) => {
        const status = job.status as JobStatus;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(job);
        return acc;
      }, {} as JobByStatus)
    : ({} as JobByStatus);
  // And assuming you want to mimic 3 job cards per status
  const jobCardsPerStatus = 4;
  return jobs.status === 'fetching' ? (
    <Grid id="home-page-jobs-skeleton-container" container item gap={2}>
      <Fragment>
        <Container disableGutters>
          <Typography variant="h5" gutterBottom>
            <Skeleton width="5%" height="100%" />
            <Skeleton variant="rectangular" width="100%" height={1} />
          </Typography>
        </Container>
        {[...Array(jobCardsPerStatus)].map((_, jobIndex) => (
          <Box
            key={jobIndex}
            width="100%"
            sx={{
              maxWidth: {md: 'calc(50% - 8.5px)', lg: 'calc(33.1% - 8.5px)'},
              minWidth: '350px',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={118}
              sx={{mb: 2}}
            />
          </Box>
        ))}
      </Fragment>
    </Grid>
  ) : (
    <GridView jobByStatus={jobByStatus} />
  );
}

export default JobSection;
