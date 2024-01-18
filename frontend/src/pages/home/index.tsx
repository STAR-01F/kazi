import {Grid } from '@mui/material';
import JobModal from './components/JobModal';

const Homepage = () => {
 
    return (
        <Grid container height={'100vh'} width={'100vw'} alignItems={"center"} justifyContent={"center"}>
            <JobModal/>
        </Grid>
    );
};

export default Homepage;
