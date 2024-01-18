import { Grid } from '@mui/material';
import SavedJob from './components/SavedJob';
import jobs from '../../repository/jobs.json';
const Homepage = () => {
  return (
    <>
      <Grid container gap={2} padding={4}>
        {jobs.map((job) => {
          return (
            <SavedJob
              companyName={job.company}
              jobTitle={job.title}
              jobID={job.id}
              logoPath="../src/assets/google-logo.png"
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Homepage;
