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
import {Component, useState} from 'react';
import {useParams} from 'react-router-dom';
import Keywords from './components/Keywords';
import OttaDescription from './components/OttaDescription';
import getKeywords from '@utils/openai';
import useFetchJobs from '@hooks/useFetchJobs';
import {Link} from 'react-router-dom';
import ManualDescription from './components/ManualDescription';

const Job = () => {
  const {id} = useParams();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
  const {status, data} = useFetchJobs(id);
  const [generateClicked, setGenerateClicked] = useState(false);

  if (status === 'idle' || status === 'fetching') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  const {
    title,
    description,
    company,
    hiringorganization,
    joblocation,
    jobsource,
  } = data![0];

  console.log('job source', data![0]);

  const handleGenerate = async () => {
    setGenerateClicked(true);
    setIsKeywordsLoading(true);
    const resp = await getKeywords(description);
    if (resp.status === 'Success') {
      setKeywords(resp.data.keywords.split(','));
    }
    setIsKeywordsLoading(false);
  };

  const handleViewJob = () => {};

  const handleUpdateJob = () => {};

  return (
    <Grid container direction={'row'} m={2} maxWidth={'lg'}>
      <Grid item xs={12} md={6}>
        <IconButton component={Link} to="/" edge="start">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Grid container direction="column"  >
          <Grid mb={2} id={'check'}>
            <Typography mb={2} variant="h4">
              {title}
            </Typography>
            <Grid
              container
              id={'logo-btns'}
              sx={{
                minHeight: {
                  xs: '100px',
                  sm: '150px',
                },

                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },

                justifyContent:{
                  xs: 'space-evenly',
                }
              }}
            >
              <Grid item xs={6} id={'company-logo'} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
              } 
    

                
              }>
                {jobsource === 'manual' ? null : (
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
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={6}
                id={'action-btns'}
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'row',
                    sm: 'column',
                  },
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={handleViewJob}
                  variant="contained"
                  size="small"
                >
                  View Job
                </Button>
                <Button
                  onClick={handleUpdateJob}
                  variant="contained"
                  size="small"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container gap={1}>
            <Grid item>
              <Typography textTransform={'capitalize'} variant="h6">
                {company}
              </Typography>
              {jobsource === 'manual' ? null : (
                <Typography
                  textTransform={'capitalize'}
                  fontWeight={'light'}
                  variant="subtitle1"
                >
                  {`${joblocation?.address?.addressRegion}, ${joblocation?.address?.addressCountry}`}
                </Typography>
              )}
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
            {jobsource === 'manual' ? (
              <ManualDescription description={description} />
            ) : (
              <OttaDescription description={description} />
            )}
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
        sx={{height: '600px'}}
      >
        {generateClicked ? null : (
          <>
            <Grid
              container
              item
              alignItems={'center'}
              direction={'column'}
              mb={3}
            >
              <SavedSearchIcon sx={{fontSize: 80}} />
              <Typography mb={3} variant="subtitle1" fontWeight={'light'}>
                Generate personalised keywords to add to your CV
              </Typography>
              <Button onClick={handleGenerate} variant="contained" size="small">
                Generate
              </Button>
            </Grid>
          </>
        )}
        <Grid
          container
          item
          direction="row"
          gap={2}
          justifyContent={'center'}
          p={2}
        >
          <Keywords keywords={keywords} isLoading={isKeywordsLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Job;
