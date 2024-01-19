import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import jobs.json from repository/jobs.json and use it to populate the job title and job description
import jobs from '../../repository/jobs.json';
import Keywords from './components/Keywords';
import Description from './components/Description';
import getKeywords from '@utils/openai';

const Job = () => {
    const { id } = useParams();
    const [jobTitle, setJobTitle] = useState('Empty Job Title');
    const [jobDescription, setJobDescription] = useState(
        'Empty Job Description'
    );
    const [keywords, setKeywords] = useState<string[]>([]);
    const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
    useEffect(() => {
        // set job title and job description
        const job = jobs.find((job) => job.id === id);
        if (job) {
            setJobTitle(job.title);
            setJobDescription(job.description);
        }
    }, [id]);
    const handleGenerate = async () => {
        setIsKeywordsLoading(true);
        const k = await getKeywords(jobDescription);
        setKeywords(k.keywords.split(','));
        setIsKeywordsLoading(false);
        console.log(k);
    };
    return (
        <Grid container item direction={'row'}>
            <Grid item xs={12} md={6}>
                <Typography variant='body1'>Job Title:</Typography>
                <Typography variant='h5'>{jobTitle}</Typography>
                <Typography variant='body1'>Job Description</Typography>
                <Description description={jobDescription} />
            </Grid>
            <Grid container item xs={12} md={6} direction={'column'}>
                <Grid container item>
                    <Button
                        onClick={handleGenerate}
                        variant='contained'
                        size='small'>
                        Generate
                    </Button>
                </Grid>
                <Grid
                    container
                    item
                    direction='row'
                    gap={2}
                    justifyContent={'center'}>
                    <Keywords
                        keywords={keywords}
                        isLoading={isKeywordsLoading}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Job;
