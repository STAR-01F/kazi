import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Keywords from './components/Keywords';
import OttaDescription from './components/OttaDescription';
import getKeywords from '@utils/openai';
import useFetchJobs from '@hooks/useFetchJobs';
import {Link} from 'react-router-dom';
import ManualDescription from './components/ManualDescription';
import MenuListButton from '@components/button/MenuListButton';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useFeedback} from '@hooks/useFeeback';
import {
  DeleteUserJob,
  UpdateUserJobStatus,
  UpdateUserJobNotes,
} from '@services/firebase/userJobs';
import {useJobs} from '@services/firebase/hooks/useJobs';

const Job = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);
  const {status, data} = useFetchJobs(id || '');
  const [generateClicked, setGenerateClicked] = useState(false);
  const {jobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);
  const [notesData, setNotesData] = useState('');

  useEffect(() => {
    if (!userJob) {
      return;
    }
    setNotesData(userJob.notes || '');
  }, [userJob]);
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
    hiringOrganization,
    jobLocation,
    jobSource,
    jobLink,
  } = data![0];

  const handleGenerate = async () => {
    setGenerateClicked(true);
    setIsKeywordsLoading(true);
    const resp = await getKeywords(description);
    if (resp.status === 'Success') {
      setKeywords(resp.data.keywords.split(','));
    }
    setIsKeywordsLoading(false);
  };

  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    if (!userJob) return;
    const resp = await DeleteUserJob(user.uid, userJob.id);
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message,
      });
      return;
    }
    setFeedback({
      type: 'error',
      message: resp.message as string,
    });
    console.error(resp);
  };

  const handleUpdateJobStatus = async (status: string) => {
    if (!user?.uid) return;
    if (!userJob) return;
    const resp = await UpdateUserJobStatus(userJob.id, status);

    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message,
      });
      return;
    }
    setFeedback({
      type: 'error',
      message: resp.message as string,
    });
    console.error(resp);
  };

  const handleUpdateJobNotes = async (notes: string) => {
    if (!user?.uid) return;
    const resp = await UpdateUserJobNotes(user.uid, id!, notes);
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: resp.message,
      });
      return;
    }

    setFeedback({
      type: 'error',
      message: resp.message,
    });
  };
  const moveMenulist = [
    {name: 'Saved', action: () => handleUpdateJobStatus('Saved')},
    {name: 'Applied', action: () => handleUpdateJobStatus('Applied')},
    {name: 'Interview', action: () => handleUpdateJobStatus('Interview')},
    {name: 'Rejected', action: () => handleUpdateJobStatus('Rejected')},
    {
      name: 'Remove',
      action: handleDeleteJob,
    },
  ];
  return (
    <Grid container direction={'row'} m={2} maxWidth={'lg'}>
      <Grid item xs={12} md={6}>
        <IconButton component={Link} to="/" edge="start">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Grid container direction="column">
          <Grid mb={2}>
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

                justifyContent: {
                  xs: 'space-evenly',
                },
              }}
            >
              <Grid
                item
                xs={6}
                id={'company-logo'}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {jobSource === 'manual' ? null : (
                  <Box
                    component={'img'}
                    alt={company}
                    src={
                      'https://images.otta.com/search/width_200/' +
                      hiringOrganization?.logo
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
                  // flexDirection: {
                  //   xs: 'row',
                  //   sm: 'row',
                  // },
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <Button
                  LinkComponent={'a'}
                  target="_blank"
                  href={jobLink}
                  variant="contained"
                  size="small"
                  sx={{
                    width: {
                      sm: '5.5rem',
                    },
                  }}
                >
                  View Job
                </Button>
                <MenuListButton
                  variant="contained"
                  size="small"
                  menuActionList={moveMenulist}
                  sx={{
                    width: {
                      sm: '5.5rem',
                    },
                  }}
                >
                  Update
                </MenuListButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography textTransform={'capitalize'} variant="h6">
                {company}
              </Typography>
              {jobSource === 'manual' ? null : (
                <Typography
                  textTransform={'capitalize'}
                  fontWeight={'light'}
                  variant="subtitle1"
                >
                  {`${jobLocation?.address?.addressRegion}, ${jobLocation?.address?.addressCountry}`}
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
            {jobSource === 'manual' ? (
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
        alignItems={'center'}
        justifyContent={'center'}
        sx={{height: '600px'}}
        p={1}
      >
        <Grid container item justifyContent={'center'}>
          <TextField
            id="outlined-multiline-static"
            label="notes"
            multiline
            rows={5}
            fullWidth={true}
            value={notesData}
            onChange={(e) => setNotesData(e.target.value)}
          />
          <Button
            onClick={() => handleUpdateJobNotes(notesData)}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
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
