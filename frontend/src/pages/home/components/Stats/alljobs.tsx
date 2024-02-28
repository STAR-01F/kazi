import CircularProgress from '@components/progress/CircularProgressWithLabel';
import {Box} from '@mui/material';
// import {Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {JobByStatus, JobStatus, groupJobsByStatus} from '@utils/groupJobStatus';

const AllJobs = () => {
  const {jobs} = useJobs();
  const totalJobs = jobs.length;

  const alljobs: JobByStatus = groupJobsByStatus(jobs);
  console.log(alljobs);
  const getJobCount = (status: JobStatus) =>
    alljobs && alljobs[status] ? alljobs[status].length : 0;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
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
      <CircularProgress
        variant={'determinate'}
        value={(getJobCount('Saved') / totalJobs) * 100}
        size={150}
        color="inherit"
        sx={{position: 'absolute', zIndex: 4}}
        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Saved Jobs"
        //   </Typography>
        // }
      >
        {/* <Typography variant="h4">{getJobCount('Saved')}</Typography> */}
      </CircularProgress>
      <CircularProgress
        variant={'determinate'}
        value={
          ((getJobCount('Applied') + getJobCount('Saved')) / totalJobs) * 100
        }
        size={150}
        color="warning"
        sx={{position: 'absolute', zIndex: 3}}

        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Applied Jobs"
        //   </Typography>
        // }
      >
        {/* <Typography variant="h4">{getJobCount('Applied')}</Typography> */}
      </CircularProgress>
      <CircularProgress
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
        sx={{position: 'absolute', zIndex: 2}}
        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Interview Jobs"
        //   </Typography>
        // }
      >
        {/* <Typography variant="h4">{getJobCount('Interview')}</Typography> */}
      </CircularProgress>
      <CircularProgress
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
        sx={{position: 'absolute', zIndex: 1}}
        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Rejected Jobs"
        //   </Typography>
        // }
      >
        {/* <Typography variant="h4">{getJobCount('Rejected')}</Typography> */}
      </CircularProgress>
    </Box>
  );
};
export default AllJobs;
