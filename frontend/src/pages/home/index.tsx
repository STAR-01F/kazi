import { Grid } from '@mui/material';
import SavedJob from './components/SavedJob';

const Homepage = () => {
  return (
    <>
      <Grid container gap={2} padding={4}>
        <SavedJob
          companyName={'Google'}
          jobTitle={'Sr. Software Engineer'}
          logoPath="../src/assets/google-logo.png"
        />
        <SavedJob
          companyName={'LinkedIn'}
          jobTitle={'Principal Site Reliability Engineer'}
          logoPath="../src/assets/google-logo.png"
        />
        <SavedJob
          companyName={'Apple'}
          jobTitle={'Sr. DevOps Engineer'}
          logoPath="../src/assets/google-logo.png"
        />
        <SavedJob
          companyName={'Netflix'}
          jobTitle={'Junior Software Engineer'}
          logoPath="../src/assets/google-logo.png"
        />
        <SavedJob
          companyName={'Amazon'}
          jobTitle={'Software Engineer'}
          logoPath="../src/assets/google-logo.png"
        />
      </Grid>
    </>
  );
};

export default Homepage;
