import CircularProgressWithLabel from '@components/progress/CircularProgressWithLabel';
import {Container, Paper, Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';

const StatsContainer = () => {
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
    <Container
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '250px',
        flexDirection: 'row',
        minWidth: '350px',
        gap: 10,
        mb: 3,
      }}
    >
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
    </Container>
  );
};

export default StatsContainer;
