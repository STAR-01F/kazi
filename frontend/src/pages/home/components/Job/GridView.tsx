import {Container, Divider, Grid, Typography} from '@mui/material';
import type {UserJob} from 'src/@types';
import {Fragment} from 'react';
import jobStatus from '@repository/job.json';
import JobCard from './Card';
import {useSearchParams} from 'react-router-dom';

type JobStatus = 'Saved' | 'Applied' | 'Interview' | 'Rejected';

type JobByStatus = {
  [status in JobStatus]: UserJob[];
};
type GridViewProps = {
  jobByStatus: JobByStatus;
};
const GridView = ({jobByStatus}: GridViewProps) => {
  const [searchParam] = useSearchParams();
  const searchStatus = searchParam.get('status');

  return (
    <Grid id="home-page-jobs-container" container item gap={2}>
      {jobStatus.status.map((statusName) => {
        if (
          searchStatus !== statusName.toLowerCase() &&
          searchStatus !== 'all' &&
          searchStatus !== null
        ) {
          return;
        }

        const jobs = jobByStatus[statusName as JobStatus];

        return (
          jobs &&
          jobs.length > 0 && (
            <Fragment key={statusName}>
              <Typography
                component={Container}
                variant={'h6'}
                gutterBottom
                disableGutters
              >
                {statusName}
                <Divider />
              </Typography>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  userJobId={job.id}
                  companyName={job.company}
                  jobTitle={job.title}
                  jobID={job.jobid}
                  logoPath={job.hiringOrganization?.logo || ''}
                  timeSince={job.statusUpdates[job.status]}
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
