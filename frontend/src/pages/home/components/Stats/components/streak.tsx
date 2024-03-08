import {Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import isStreak from '@utils/isStreak';

const Streak = () => {
  const {jobs} = useJobs();

  const streak = isStreak(
    jobs.map((job) => job.statusUpdates['Saved'].toDate())
  );
  console.log(streak, 'streak');

  jobs.map((job) => console.log(job.statusUpdates['Saved'].toDate()));

  return (
    <Typography fontWeight={600} variant="h1" color="textSecondary">
      {streak?.currentStreak}
    </Typography>
  );
};

export default Streak;
