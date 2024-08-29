import {Box} from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';

const RejectedStepper = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        color: 'salmon',
        fontWeight: '900',
      }}
    >
      <LensIcon sx={{color: 'salmon'}} />
      <span color="red">rejected</span>
    </Box>
  );
};

export {RejectedStepper};
