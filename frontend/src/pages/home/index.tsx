import {Grid } from '@mui/material';
import JobModal from './components/JobModal';

const Homepage = () => {
 
    return (
        <Grid container height={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"}>
            <JobModal/>
        </Grid>
    );
};

export default Homepage;
