import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import jobs.json from repository/jobs.json and use it to populate the job title and job description
import jobs from '../../repository/jobs.json';
import main from '../../utils/openai';

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
                {/* <Typography variant='body1'>{jobDescription}</Typography> */}
                {jobDescription.split('\n').map((line, index) => {
                    if (line.length < 50) {
                        return (
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                key={index}
                                align='justify'>
                                {line}
                            </Typography>
                        );
                    }
                    return (
                        <Typography variant='h6' key={index} align='justify'>
                            {line}
                        </Typography>
                    );
                })}
            </Grid>
            <Grid item xs={12} md={6} direction={'column'}>
                <Grid container item>
                    <Button onClick={main} variant='contained' size='small'>
                        Generate
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Job;
