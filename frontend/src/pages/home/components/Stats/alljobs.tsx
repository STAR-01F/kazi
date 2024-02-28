import CircularProgressWithLabel from '@components/progress/CircularProgressWithLabel';
import {Box, Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {JobByStatus, groupJobsByStatus} from '@utils/groupJobStatus';

const AllJobs = () => {
  const {jobs} = useJobs();
  const totalJobs = jobs.length;

  const alljobs: JobByStatus = groupJobsByStatus(jobs);

  const getJobCount = (status: string) =>
    alljobs && alljobs[status] ? alljobs[status].length : 0;

  return (
    <Box
    >
      {/* <CircularProgressWithLabel
        variant={'determinate'}
        value={(totalJobs / totalJobs) * 100}
        size={150}
        color="secondary"
        label={
          <Typography variant="h6" sx={{mt: 1}}>
            "Total Jobs"
          </Typography>
        }
      >
        <Typography variant="h4">{`${totalJobs}`}</Typography>
      </CircularProgressWithLabel> */}
      <CircularProgressWithLabel
        variant={'determinate'}
        value={(getJobCount('Saved') / totalJobs) * 100}
        size={150}
        color="inherit"
        label={
          <Typography variant="h6" sx={{mt: 1}}>
            "Saved Jobs"
          </Typography>
        }
      >
        <Typography variant="h4">{getJobCount('Saved')}</Typography>
      </CircularProgressWithLabel>
      <CircularProgressWithLabel
        variant={'determinate'}
        value={
          ((getJobCount('Applied') + getJobCount('Saved')) / totalJobs) * 100
        }
        size={150}
        color="warning"
        label={
          <Typography variant="h6" sx={{mt: 1}}>
            "Applied Jobs"
          </Typography>
        }
      >
        <Typography variant="h4">{getJobCount('Applied')}</Typography>
      </CircularProgressWithLabel>
      <CircularProgressWithLabel
        variant={'determinate'}
        value={
          ((getJobCount('Interview') +
            getJobCount('Applied') +
            getJobCount('Saved')) /
            totalJobs) *
          100
        }
        size={150}
        color="success"
        label={
          <Typography variant="h6" sx={{mt: 1}}>
            "Interview Jobs"
          </Typography>
        }
      >
        <Typography variant="h4">{getJobCount('Interview')}</Typography>
      </CircularProgressWithLabel>
      <CircularProgressWithLabel
        variant={'determinate'}
        value={
          ((getJobCount('Rejected') +
            getJobCount('Interview') +
            getJobCount('Applied') +
            getJobCount('Saved')) /
            totalJobs) *
          100
        }
        size={150}
        color="error"
        label={
          <Typography variant="h6" sx={{mt: 1}}>
            "Rejected Jobs"
          </Typography>
        }
      >
        <Typography variant="h4">{getJobCount('Rejected')}</Typography>
      </CircularProgressWithLabel>
    </Box>
  );
};
export default AllJobs;
