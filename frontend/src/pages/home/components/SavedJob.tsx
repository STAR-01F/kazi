import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
} from '@mui/material';

// props to be passed in should be job title and company, possibly logo. Using ts for the props.

// for now use a simple object that has the info above and can be passed into the component
const SavedJob = () => {
  // a singular job component that will be stacked in a grid or flex when a user starts to save jobs
  return (
    <Card variant="outlined" sx={{ minWidth: 300 }}>
      <CardContent>
        <Stack>
          <Typography fontSize={20} fontWeight={'bold'}>
            Company Name
          </Typography>
          <Typography>Software engineer</Typography>
        </Stack>
        <Box mt={2}>
          <Button variant={'contained'} size="small">
            view
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SavedJob;
