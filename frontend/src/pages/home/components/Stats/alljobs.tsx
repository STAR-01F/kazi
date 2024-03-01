import CircularProgress from '@components/progress/CircularProgressWithLabel';
import {Box} from '@mui/material';
import {Typography} from '@mui/material';
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
      id="alljobs-1"
      sx={{
        position: 'relative',
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
        sx={{
          position: 'absolute',
          top: -80,
          left: -30,
          bottom: 0,
          right: 0,
          zIndex: 4,
        }}
        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Saved Jobs"
        //   </Typography>
        // }
      ></CircularProgress>
      <CircularProgress
        variant={'determinate'}
        value={
          ((getJobCount('Applied') + getJobCount('Saved')) / totalJobs) * 100
        }
        size={150}
        color="warning"
        sx={{
          position: 'absolute',
          top: -80,
          left: -30,
          bottom: 0,
          right: 0,
          zIndex: 3,
        }}

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
        sx={{
          position: 'absolute',
          top: -80,
          left: -30,
          bottom: 0,
          right: 0,
          zIndex: 2,
        }}
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
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: -80,
          left: -30,
          bottom: 0,
          right: 0,
        }}
        // label={
        //   <Typography variant="h6" sx={{mt: 1}}>
        //     "Rejected Jobs"
        //   </Typography>
        // }
      >
        {/* <Typography variant="h4">{getJobCount('Rejected')}</Typography> */}
        <Box
          sx={{
            top: -10,
            left: 45,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4">{totalJobs}</Typography>
        </Box>
      </CircularProgress>
      <Typography variant="h6" sx={{mt: 1}}>
            Jobs
      </Typography>
    </Box>
  );
};
export default AllJobs;
