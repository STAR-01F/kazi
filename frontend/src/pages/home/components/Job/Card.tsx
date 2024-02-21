import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Avatar,
  Grid,
  CardActions,
  Paper,
} from '@mui/material';
import {Link} from 'react-router-dom';
import MenuListButton from '@components/button/MenuListButton';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {DeleteJob, UpdateJobStatus} from '@services/firebase/jobs';

// props to be passed in should be job title and company, possibly logo. Using ts for the props.

// TODO
// add company logo

type JobCardProps = {
  companyName: string;
  jobTitle: string;
  logoPath: string;
  jobID: string;
};
const JobCard = ({companyName, jobTitle, logoPath, jobID}: JobCardProps) => {
  const {user} = useAuth();
  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    const resp = await DeleteJob(user.uid, jobID);
    if (resp.status === 'Success') {
      console.log(resp);
      return;
    }
    console.error(resp);
  };

  const handleUpdateJobStatus = async (status: string) => {
    if (!user?.uid) return;
    const resp = await UpdateJobStatus(user.uid, jobID, status);

    if (resp.status === 'Success') {
      console.log(resp);
      return;
    }
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
        minWidth: '350px',
        maxWidth: {
          xs: '100%',
          md: 'calc(50% - 8.5px)',
          lg: 'calc(33.1% - 8.5px)',
        },
        width: '100%',
        height: 'max-content',
      }}
    >
      <CardContent>
        <Grid container justifyContent={'space-between'}>
          <Stack>
            <Typography fontSize={20} fontWeight={'bold'}>
              {companyName}
            </Typography>
            <Typography>{jobTitle}</Typography>
          </Stack>
          <Avatar
            alt={companyName}
            src={logoPath}
            sx={{height: 'auto', width: '55px'}}
          />
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant={'contained'}
          component={Link}
          to={`job/${jobID}`}
          size="small"
        >
          View
        </Button>
        <MenuListButton
          variant="contained"
          size="small"
          menuActionList={moveMenulist}
        >
          Move
        </MenuListButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
