import {Container, Divider, Grid, Typography} from '@mui/material';
import type {Job} from 'src/@types';
import {Fragment} from 'react';
import jobStatus from '@repository/job.json';
import JobCard from './Card';

type JobStatus = 'Saved' | 'Applied' | 'Interview ' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: Job[];
};
type GridViewProps = {
  jobByStatus: JobByStatus;
};
const GridView = ({jobByStatus}: GridViewProps) => {
  return (
    <Grid
      id="home-page-jobs-container"
      container
      item
      gap={2}
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
                <JobCard
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
  );
};

export default GridView;
