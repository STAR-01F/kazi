import {Box, Typography} from '@mui/material';
import {useProfile} from '@services/firebase/hooks/useProfile';
import streak from '../../../../../assets/streak-flame.png';

const Streak = () => {
  const {userProfile} = useProfile();
  const flame = 70;

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        fontWeight={600}
        variant="h2"
        color="white"
        position="absolute"
        zIndex={1}
      >
        {userProfile?.currentStreak || 0}
      </Typography>
      <Box width={flame} height={flame} component={'img'} src={streak}></Box>
    </Box>
  );
};

export default Streak;
