import {Grid, Typography} from '@mui/material';
import SavedJob from './components/SavedJob';
import JobModal from './components/JobModal';
import useFetchJobs from '@hooks/useFetchJobs';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {getDisplayName} from '@utils/helper';

const Homepage = () => {
  const jobs = useFetchJobs();
  const {user} = useAuth();
  return (
    <Grid container gap={2} padding={4}>
      <Typography variant="h4">
        Welcome, {getDisplayName(user?.displayName || '')}
      </Typography>
      <JobModal />
      {jobs.data &&
        jobs.data.map((job) => {
          return (
            <SavedJob
              key={job.id}
              companyName={job.company}
              jobTitle={job.title}
              jobID={job.id!}
              logoPath="../src/assets/google-logo.png"
            />
          );
        })}
    </Grid>
  );
};

export default Homepage;
