import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
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
  const {title, description, company, hiringorganization, joblocation} =
    data![0];
  console.log('checking job description', description);
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
    <Grid container direction={'row'} m={3} maxWidth={'lg'}>
      <Grid item xs={12} md={6}>
        <IconButton component={Link} to="/" edge="start">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Grid container direction="column" mb={3}>
          <Grid>
            <Typography mb={2} variant="h4">
              {title}
            </Typography>
            <Box
              component={'img'}
              alt={company}
              src={
                'https://images.otta.com/search/width_200/' +
                hiringorganization?.logo
              }
              sx={{
                height: 'auto',
                width: 'auto',
                maxWidth: '200px',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid container gap={1}>
            <Grid item>
              <Typography textTransform={'capitalize'} variant="h5">
                {company}
              </Typography>
              <Typography
                textTransform={'capitalize'}
                fontWeight={'light'}
                variant="h6"
              >
                {`${joblocation?.address?.addressRegion}, ${joblocation?.address?.addressCountry}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Card>
          <CardHeader
            style={{
              borderRadius: '5px 5px 0 0',
              background: '#D5D5D5',
              color: 'black',
            }}
            title="Role"
            titleTypographyProps={{fontSize: '1.2rem', fontWeight: 'bold'}}
            sx={{height: '2.5rem'}}
          />
          <CardContent>
            <Description description={description} />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid container item alignItems={'center'} direction={'column'} mb={3}>
          <SavedSearchIcon sx={{fontSize: 80}} />
          <Typography mb={3} variant="subtitle1" fontWeight={'light'}>
            Generate personalised keywords to add to your CV
          </Typography>
          <Button onClick={handleGenerate} variant="contained" size="small">
            Generate
          </Button>
        </Grid>
        <Grid
          m={2}
          container
          item
          direction="row"
          gap={2}
          justifyContent={'center'}
        >
          <Keywords keywords={keywords} isLoading={isKeywordsLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Job;
