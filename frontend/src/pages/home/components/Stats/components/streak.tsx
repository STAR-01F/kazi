import {Typography} from '@mui/material';
import {useProfile} from '@services/firebase/hooks/useProfile';

const Streak = () => {
  const {userProfile} = useProfile();

  return (
    <Typography fontWeight={600} variant="h1" color="textSecondary">
      {userProfile?.currentStreak || 0}
    </Typography>
  );
};

export default Streak;
