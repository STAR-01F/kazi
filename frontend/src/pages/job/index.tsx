import {
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

import {LogoAttribution} from '@pages/home/components/LogoAttribution';

import {useParams} from 'react-router-dom';
import OttaDescription from './components/JobDescription/OttaDescription';
import useFetchJobs from '@hooks/useFetchJobs';
import ManualDescription from './components/JobDescription/ManualDescription';
import WorkableDescription from './components/JobDescription/WorkableDescription';
import MenuListButton from '@components/button/MenuListButton';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useFeedback} from '@hooks/useFeeback';
import {DeleteUserJob, UpdateUserJobStatus} from '@services/firebase/userJobs';
import {useJobs} from '@services/firebase/hooks/useJobs';
import BreadcrumbsCard from './components/BreadcrumbsCard/BreadcrumbsCard';
import SkeletonJob from '@components/skeleton/job';
import {Timestamp} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import ConfirmDelete from '@components/dialog/ConfirmDelete';

const Job = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const {status, data} = useFetchJobs(id || '');
  const {jobs, setJobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  if (status === 'idle' || status === 'fetching') {
    return <SkeletonJob />;
  }
  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  const {
    title,
    description,
    company,
    companyLogoURL,
    hiringOrganization,
    jobLocation,
    jobSource,
    jobLink,
    workableDescription,
    workableLocation,
  } = data![0];

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    if (!userJob) return;
    const resp = await DeleteUserJob(user.uid, userJob.id);
    if (resp.status === 'Success') {
      setFeedback({
        type: 'success',
        message: 'Successfully deleted',
      });
      const jobsToKeep = jobs.filter((job) => job.id !== userJob.id);
      setJobs(jobsToKeep);
      navigate('/');
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
      const updatedJobs = jobs.map((job) => {
        if (job.id === userJob.id) {
          if (status === 'Saved') {
            return {...job, status};
          } else {
            const updatedAt = Timestamp.now();
            return {
              ...job,
              status: status,
              statusUpdates: {
                ...job.statusUpdates,
                [status]: updatedAt,
              },
            };
          }
        }
        return job;
      });
      setJobs(updatedJobs);
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
      action: () => setOpenDialog(true),
    },
  ];

  const ApplicationStatus = ['Saved', 'Applied', 'Interview', 'Offer!'];

  const activeStep = () => {
    return jobs!.filter((item) => item.jobid === id)![0];
  };

  const activeIndex = () => {
    const aStep = activeStep();
    return aStep ? ApplicationStatus.indexOf(aStep.status) : -1;
  };

  return (
    <>
      <Grid
        container
        direction={'row'}
        m={2}
        maxWidth={'lg'}
        padding={{xs: '10px 20px', md: '15px 30px', lg: '20px 40px'}}
      >
        <Grid container direction="column" p={1} id={'headhoncho'}>
          <Grid id="inner container wrapper">
            <Grid
              item
              xs={12}
              alignItems={'center'}
              justifyContent={'flex-end'}
              id="title"
            >
              <Typography mb={1} variant="h4">
                {title}
              </Typography>
            </Grid>
            <Grid container id={'co-name'}>
              <Grid id={'company-logo'} alignItems={'center'} gap={1}>
                {jobSource === 'manual' ? (
                  <Box
                    component={'img'}
                    alt={''}
                    src={companyLogoURL}
                    sx={{
                      width: '125px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: '8%',
                    }}
                  />
                ) : (
                  <Box
                    component={'img'}
                    alt={company}
                    src={
                      jobSource === 'Otta'
                        ? 'https://images.otta.com/search/width_200/' +
                          hiringOrganization?.logo
                        : hiringOrganization?.logo
                    }
                    sx={{
                      width: '200px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              gap={1}
              display={'flex'}
              alignItems={'center'}
              direction={'row'}
              justifyContent={'flex-end'}
              pb={4}
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
              <ConfirmDelete
                open={openDialog}
                onCancelClick={handleCloseDialog}
                onDeleteClick={handleDeleteJob}
              ></ConfirmDelete>
            </Grid>
          </Grid>
          {/* </Grid> */}
          <Grid container>
            <Grid item id={'who-is-it'} xs={6}>
              <Typography textTransform={'capitalize'} variant="h6">
                {company}
              </Typography>
              {(() => {
                switch (jobSource) {
                  case 'manual':
                    return null;
                  case 'Otta':
                    return (
                      <Typography
                        textTransform={'capitalize'}
                        fontWeight={'light'}
                        variant="subtitle1"
                      >
                        {`${jobLocation?.address?.addressRegion}, ${jobLocation?.address?.addressCountry}`}
                      </Typography>
                    );
                  case 'Workable':
                    return (
                      <Typography
                        textTransform={'capitalize'}
                        fontWeight={'light'}
                        variant="subtitle1"
                      >
                        {workableLocation}
                      </Typography>
                    );
                }
              })()}
            </Grid>
            <Grid item sm={3} />

            <Grid
              item
              sm={3}
              display={'flex'}
              alignItems={'center'}
              direction={'row'}
              justifyContent={'flex-end'}
              sx={{
                display: {xs: 'none', md: 'block'},
              }}
            >
              <Box>
                <Stepper activeStep={activeIndex()} alternativeLabel>
                  {ApplicationStatus.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} p={1}>
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
              {(() => {
                switch (jobSource) {
                  case 'manual':
                    return <ManualDescription description={description} />;
                  case 'Otta':
                    return <OttaDescription description={description} />;
                  case 'Workable':
                    return (
                      <WorkableDescription description={workableDescription} />
                    );
                }
              })()}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} p={1}>
          <BreadcrumbsCard
            userJob={userJob}
            description={description || workableDescription.join(' ')}
          ></BreadcrumbsCard>
        </Grid>
      </Grid>
      <LogoAttribution />
    </>
  );
};

export default Job;
