import {Grid } from '@mui/material';
import AddJob from './components/AddJob';

const Homepage = () => {
 
    return (
        <Grid container height={'100vh'} width={'100vw'} alignItems={"center"} justifyContent={"center"}>
            <AddJob/>
        </Grid>
    );
};

export default Homepage;
