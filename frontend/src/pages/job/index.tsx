import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Job = () => {
    const { id } = useParams();
    const [jobTitle, setJobTitle] = useState('Empty Job Title');
    const [jobDescription, setJobDescription] = useState(
        'Empty Job Description'
    );
    return (
        <Grid container item direction={'column'}>
            <Grid item xs={6} md={12}>
                <Typography variant='h5'>Job Title</Typography>
                <Typography variant='h6'>{jobTitle}</Typography>
                <Typography variant='h5'>Job Description</Typography>
                <Typography variant='body1'>{jobDescription}</Typography>
            </Grid>
            <Grid item xs={6} md={12} direction={'column'}>
                <Grid container item>
                    <Button variant='contained'>Generate</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Job;
