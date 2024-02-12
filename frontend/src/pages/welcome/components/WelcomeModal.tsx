import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import { Button, Box, Grid } from "@mui/material";

const WelcomeModal  = () => {
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
    <Grid container>
      <SwipeableViews index={index}>
        <Typography component="h1" variant="h5">
          This is the welcome page
        </Typography>
        <Typography component="h1" variant="h5">
          Quick tutorial on how to use the app
        </Typography>
        <Typography component="h1" variant="h5">
          Get more info about the user
        </Typography>
      </SwipeableViews>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleBack}> Back</Button>
        <Button variant="contained" color="primary" onClick={handleNext}> Next</Button>
      </Box>
    </Grid>
  );
}

export default WelcomeModal;
