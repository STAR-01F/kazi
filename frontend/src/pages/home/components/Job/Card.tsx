import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Grid,
  CardActions,
  Paper,
  CardMedia,
  Box,
} from '@mui/material';
import {Link} from 'react-router-dom';
import MenuListButton from '@components/button/MenuListButton';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {DeleteJob, UpdateJobStatus} from '@services/firebase/jobs';
import {useFeedback} from '@hooks/useFeeback';

type JobCardProps = {
  companyName: string;
  jobTitle: string;
  logoPath: string;
  jobID: string;
};
const JobCard = ({companyName, jobTitle, logoPath, jobID}: JobCardProps) => {
  const {user} = useAuth();
  const {setFeedback} = useFeedback();
  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    const resp = await DeleteJob(user.uid, jobID);
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
    const resp = await UpdateJobStatus(user.uid, jobID, status);

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
    <Card
      component={Paper}
      variant="outlined"
      sx={{
        // minWidth: '350px',
        maxWidth: {
          xs: '100%',
          sm: 'calc((100% - (1 * 16px))/2)',
          md: 'calc((100% - (2 * 16px))/3)',
          lg: 'calc((100% - (3 * 16px))/4)',
        },
        width: '100%',
        height: 'max-content',
      }}
    >
      {logoPath ? (
        <CardMedia
          component="img"
          alt={companyName}
          sx={{
            height: '100px',
            objectFit: 'contain',
            p: '10px',
          }}
          image={'https://images.otta.com/search/width_400/' + logoPath}
        />
      ) : (
        <Box
          sx={{
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: '10px',
          }}
        >
          <Typography variant="h5">{companyName}</Typography>
        </Box>
      )}
      <CardContent>
        <Grid container justifyContent={'space-between'}>
          <Stack sx={{width: '100%'}}>
            <Typography fontSize={20} fontWeight={'bold'} noWrap>
              {companyName}
            </Typography>
            <Typography noWrap>{jobTitle}</Typography>
          </Stack>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant={'outlined'}
          component={Link}
          to={`job/${jobID}`}
          size="small"
          fullWidth
        >
          View
        </Button>
        <MenuListButton
          variant="contained"
          size="small"
          menuActionList={moveMenulist}
          fullWidth
        >
          Actions
        </MenuListButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
