import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Avatar,
  Grid,
} from '@mui/material';
import {Link} from 'react-router-dom';

// props to be passed in should be job title and company, possibly logo. Using ts for the props.

// TODO
// add company logo

type SavedJobProps = {
  companyName: string;
  jobTitle: string;
  logoPath: string;
  jobID: string;
};

const SavedJob = ({companyName, jobTitle, logoPath, jobID}: SavedJobProps) => {
  return (
    <Card
      variant="outlined"
      sx={{maxWidth: 350, width: '100%', maxHeight: 150}}
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
        <Stack mt={2} gap={1} direction={'row'}>
          <Button
            variant={'contained'}
            component={Link}
            to={`job/${jobID}`}
            size="small"
          >
            View
          </Button>
          <Button variant={'contained'} size="small">
            Move
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SavedJob;
