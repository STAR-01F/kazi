import {Box, Container, Grid, Skeleton, Typography} from '@mui/material';
import {Fragment} from 'react';

const LoadingGridView = () => {
  const jobCardsPerStatus = 4;
  return (
    <Grid container item gap={2}>
      <Fragment>
        <Container disableGutters>
          <Typography variant="h5" gutterBottom>
            <Skeleton width="5%" height="100%" />
            <Skeleton variant="rectangular" width="100%" height={1} />
          </Typography>
        </Container>
        {[...Array(jobCardsPerStatus)].map((_, jobIndex) => (
          <Box
            key={jobIndex}
            width="100%"
            sx={{
              maxWidth: {md: 'calc(50% - 8.5px)', lg: 'calc(33.1% - 8.5px)'},
              minWidth: '350px',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={118}
              sx={{mb: 2}}
            />
          </Box>
        ))}
      </Fragment>
    </Grid>
  );
};

export default LoadingGridView;
