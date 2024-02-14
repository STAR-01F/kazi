import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton} from "@mui/material";
import BackIcon from '@components/icons/backIcon';
import NextIcon from '@components/icons/nextIcon';

const WelcomePage  = () => {
  const [index, setIndex] = useState(0);
  const numViews = 3; // Number of swipeable views

  const handleBack = () => {
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (index < numViews - 1) {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <Grid sx={{ backgroundColor: 'grey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}} container >
      <SwipeableViews index={index}>
        <Typography color={'white'} component="h1" variant="h5" textAlign={'center'}>
          This is the welcome page
        </Typography>
        <Typography color={'white'} component="h1" variant="h5" textAlign={'center'}>
          Quick tutorial on how to use the app
        </Typography>
        <Typography color={'white'} component="h1" variant="h5" textAlign={'center'}>
          Get more info about the user
        </Typography>
      </SwipeableViews>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', width: '100%',}}>
        <IconButton sx={{backgroundColor: 'white'}} onClick={handleBack} color="primary" aria-label="back">
          <BackIcon />
        </IconButton>
        <IconButton sx={{backgroundColor: 'white'}} onClick={handleNext} color="primary" aria-label="next">
          <NextIcon />
        </IconButton>
      </Box>
    </Grid>
  );
}

export default WelcomePage;
