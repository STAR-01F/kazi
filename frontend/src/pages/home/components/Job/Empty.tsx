import {Button, Grid, Typography} from '@mui/material';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import {useSearchParams} from 'react-router-dom';
const Empty = () => {
  const [, setOpen] = useSearchParams();
  const handleAddJob = () => {
    setOpen({jobModal: 'open'});
  };
  return (
    <Grid
      sx={{display: 'flex'}}
      direction={'column'}
      width="100%"
      height={'50%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <WorkOffIcon sx={{fontSize: 80}} />
      <Typography mb={3} variant="subtitle1" fontWeight={'light'}>
        Add job to keep track
      </Typography>
      <Button onClick={handleAddJob} variant="contained" size="small">
        Add Job
      </Button>
    </Grid>
  );
};

export default Empty;
