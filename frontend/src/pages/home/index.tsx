import { Grid } from '@mui/material';
import SavedJob from './components/SavedJob';

const Homepage = () => {
  return (
    <>
      <Grid border={'1px solid green'} container gap={2} padding={4}>
        <SavedJob />
        <SavedJob />
        <SavedJob />
        <SavedJob />
        <SavedJob />
      </Grid>
    </>
  );
};

export default Homepage;
