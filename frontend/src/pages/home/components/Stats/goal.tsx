import CircularProgressWithLabel from '@components/progress/CircularProgressWithLabel';
import {Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';

const Goal = () => {
  const {jobs} = useJobs();
  const lengthJobsThatYouApplied = jobs.filter(
    (job) => job.status === 'Applied' || job.status === 'Interviewing'
  ).length;
  // TODO: Replace with actual goal value
  const defaultValue = 10;

  const percentage =
    ((lengthJobsThatYouApplied > defaultValue
      ? defaultValue
      : lengthJobsThatYouApplied) /
      defaultValue) *
    100;
  return (
    
    <CircularProgressWithLabel
      variant={'determinate'}
      value={percentage}
      size={150}
      label={
        <Typography variant="h6" sx={{mt: 1}}>
          "Goal"
        </Typography>
      }
    >
      <Typography variant="h4">{`${lengthJobsThatYouApplied}`}</Typography>
      <Typography variant="h6">{`/`}</Typography>
      <Typography>{`${defaultValue}`}</Typography>
    </CircularProgressWithLabel>
  );
};

export default Goal;
