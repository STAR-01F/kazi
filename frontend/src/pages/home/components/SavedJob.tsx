import { Card, CardContent, Typography, Stack, Button } from '@mui/material';

// props to be passed in should be job title and company, possibly logo. Using ts for the props.

// TODO
// add company logo
// add props in for the saved job, using ts
const SavedJob = () => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300, width: '100%' }}>
      <CardContent>
        <Stack>
          <Typography fontSize={20} fontWeight={'bold'}>
            Company Name
          </Typography>
          <Typography>Software engineer</Typography>
        </Stack>
        <Stack mt={2} gap={1} direction={'row'}>
          <Button variant={'contained'} size="small">
            view
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
