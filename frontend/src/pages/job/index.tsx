import {
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';

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

const Job = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const {status, data} = useFetchJobs(id || '');
  const {jobs, setJobs} = useJobs();
  const userJob = jobs.find((job) => job.jobid === id);

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
    hiringOrganization,
    jobLocation,
    jobSource,
    jobLink,
    workableDescription,
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
      const jobsToKeep = jobs.filter((job) => job.id !== userJob.id);
      setJobs(jobsToKeep);
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
        console.log('status=======>', status);
        if (job.id === userJob.id) {
          if (status === 'Saved') {
            return {...job, status};
          } else {
            const updatedAt = Timestamp.now();
            console.log('updatedAt=======>', updatedAt);
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
      <Grid container direction="column" p={1}>
        <Grid>
          <Typography mb={1} variant="h4">
            {title}
          </Typography>
          <Grid container id={'logo-btns'}>
            <Grid container item id={'company-logo'} alignItems={'center'}>
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

              <Grid
                container
                item
                id={'action-btns'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={2}
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
          description={description}
        ></BreadcrumbsCard>
      </Grid>
    </Grid>
  );
};

export default Job;
