import {Button, Grid, Typography, Avatar, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
      console.log(resp.data.keywords);
      setKeywords(resp.data.keywords.split(','));
    }
    setIsKeywordsLoading(false);
    console.log(resp);
  };
  return (
    <Grid container direction={'row'} m={3}>
      <Grid item xs={12} md={6}>
        <IconButton component={Link} to="/" edge="start">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Grid container direction="column" mb={3}>
          <Typography mb={1} variant="h3">
            {title}
          </Typography>
          <Grid container direction="row" xs={3} gap={1}>
            <Avatar
              alt={company}
              src={'../src/assets/google-logo.png'}
              sx={{height: 'auto', width: '55px'}}
            />
            <Grid item>
              <Typography variant="h5">{company}</Typography>
              <Typography variant="subtitle1">London</Typography>
            </Grid>
          </Grid>
        </Grid>
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
