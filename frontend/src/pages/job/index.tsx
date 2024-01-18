import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import jobs.json from repository/jobs.json and use it to populate the job title and job description
import jobs from '../../repository/jobs.json';
import Description from './components/Description';

const Job = () => {
    const { id } = useParams();
    const [jobTitle, setJobTitle] = useState('Empty Job Title');
    const [jobDescription, setJobDescription] = useState(
        'Empty Job Description'
    );
    useEffect(() => {
        // set job title and job description
        const job = jobs.find((job) => job.id === id);
        if (job) {
            setJobTitle(job.title);
            setJobDescription(job.description);
        }
    }, [id]);
    return (
        <Grid container item direction={'row'}>
            <Grid item xs={12} md={6}>
                <Typography variant='body1'>Job Title:</Typography>
                <Typography variant='h5'>{jobTitle}</Typography>
                <Typography variant='body1'>Job Description</Typography>
                <Description description={jobDescription} />
            </Grid>
            <Grid item xs={12} md={6} direction={'column'}>
                <Grid container item>
                    <Button variant='contained' size='small'>
                        Generate
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Job;
