import {Typography} from '@mui/material';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {useProfile} from '@services/firebase/hooks/useProfile';
import isStreak from '@utils/isStreak';

const Streak = () => {
  const userProfile = useProfile();
  console.log('userProfile===========>', userProfile);
  const {jobs} = useJobs();

  const savedJobs = jobs.map((job) => job.statusUpdates['Saved'].toDate());
  const streak = isStreak(savedJobs);

  console.log(streak, 'streak');

  jobs.map((job) => console.log(job.statusUpdates['Saved'].toDate()));

  return (
    <Typography fontWeight={600} variant="h1" color="textSecondary">
      {streak?.currentStreak}
    </Typography>
  );
};

export default Streak;
