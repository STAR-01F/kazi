import { Grid } from '@mui/material';
import SavedJob from './components/SavedJob';
import JobModal from './components/JobModal';
import jobs from '../../repository/jobs.json';

const Homepage = () => {
    return (
        <Grid container gap={2} padding={4}>
            <JobModal />
            {jobs.map((job) => {
                return (
                    <SavedJob
                        key={job.id}
                        companyName={job.company}
                        jobTitle={job.title}
                        jobID={job.id}
                        logoPath='../src/assets/google-logo.png'
                    />
                );
            })}
        </Grid>
    );
};

export default Homepage;
