import {Button, Grid, Typography} from '@mui/material';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import Keywords from './components/Keywords';
import Description from './components/Description';
import getKeywords from '@utils/openai';
import useFetchJobs from '@hooks/useFetchJobs';
import {Link} from 'react-router-dom';

const Job = () => {
  const {id} = useParams();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
  const {status, data} = useFetchJobs(id);

  if (status === 'idle' || status === 'fetching') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error fetching data</div>;
  }
  const {title, description, company} = data![0];

  const handleGenerate = async () => {
    setIsKeywordsLoading(true);
    const resp = await getKeywords(description);
    if (resp.status === 'Success') {
      setKeywords(resp.data.keywords.split(','));
    }
    setIsKeywordsLoading(false);
  };
  return (
    <Grid container item direction={'row'}>
      <Grid item xs={12} md={6}>
        <Button variant={'contained'} component={Link} to={`/`} size="small">
          back
        </Button>
        <Typography variant="h5">Job Details</Typography>
        <Typography variant="body1">Job Title:</Typography>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">Company:</Typography>
        <Typography variant="h5">{company}</Typography>
        <Typography variant="body1">Job Description</Typography>
        <Description description={description} />
      </Grid>
      <Grid container item xs={12} md={6} direction={'column'}>
        <Grid container item>
          <Button onClick={handleGenerate} variant="contained" size="small">
            Generate
          </Button>
        </Grid>
        <Grid container item direction="row" gap={2} justifyContent={'center'}>
          <Keywords keywords={keywords} isLoading={isKeywordsLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Job;
