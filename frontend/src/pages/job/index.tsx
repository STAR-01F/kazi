import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Breadcrumbs,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotesIcon from '@mui/icons-material/Notes';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import {useParams} from 'react-router-dom';
import Keywords from './components/Keywords/Keywords';
import OttaDescription from './components/JobDescription/OttaDescription';
import useFetchJobs from '@hooks/useFetchJobs';
import ManualDescription from './components/JobDescription/ManualDescription';
import MenuListButton from '@components/button/MenuListButton';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {Link} from 'react-router-dom';
import {useFeedback} from '@hooks/useFeeback';
import {DeleteUserJob, UpdateUserJobStatus} from '@services/firebase/userJobs';
import {useJobs} from '@services/firebase/hooks/useJobs';
import Notes from './components/Notes/Notes';
import {useState} from 'react';

const Job = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const {status, data} = useFetchJobs(id || '');
  const {jobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);
  const [selectedComponent, setSelectedComponent] = useState('Notes');
  const breadcrumbs = [
    <MuiLink
      underline="hover"
      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setSelectedComponent('Notes')}
    >
      <NotesIcon sx={{mr: 0.5}}></NotesIcon>
      Notes
    </MuiLink>,
    <MuiLink
      underline="hover"
      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={() => setSelectedComponent('Keywords')}
    >
      <SavedSearchIcon sx={{mr: 0.5}}></SavedSearchIcon>
      Suggestions
    </MuiLink>,
  ];
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
    <Grid
      container
      direction={'row'}
      m={2}
      maxWidth={'lg'}
      padding={{xs: '10px 20px', md: '15px 30px', lg: '20px 40px'}}
    >
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
        xs={12}
        md={6}
        // alignItems={'center'}
        // justifyContent={'center'}
        sx={{height: '600px'}}
        p={1}
      >
        <Stack spacing={2}>
          <Breadcrumbs separator="|">{breadcrumbs}</Breadcrumbs>
        </Stack>
        {selectedComponent === 'Notes' && <Notes userJob={userJob}></Notes>}
        {selectedComponent === 'Keywords' && (
          <Keywords description={description} />
        )}
      </Grid>
    </Grid>
  );
};

export default Job;
