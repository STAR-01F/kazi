import {Grid} from '@mui/material';
import SavedJob from './components/SavedJob';
import JobModal from './components/JobModal';
import useFetchJobsByUID from '@hooks/useFetchJobsByUID';


const Homepage = () => {
  const {status, data} = useFetchJobsByUID();

  if (status === 'idle' || status === 'fetching') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <Grid container gap={2} padding={4}>
      <JobModal />
      {data && data.length > 0 &&
        data.map((job) => {
          return (
            <SavedJob
              key={job?.id}
              companyName={job?.company}
              jobTitle={job?.title}
              jobID={job?.id}
              logoPath="../src/assets/google-logo.png"
            />
          );
        })}
    </Grid>
  );
};

export default Homepage;
