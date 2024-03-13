import {Dialog, Grid, Skeleton} from '@mui/material';

const SkeletonJob = () => {
  return (
    <Dialog
      open={true}
      fullScreen
      hideBackdrop={true}
      sx={{
        mt: {xs: '57px', md: '65px'},
      }}
    >
      <Grid
        container
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        // alignContent={'center'}
        mt={'30px'}
      >
        <Grid
          container
          direction={'row'}
          width={'100%'}
          height={'Calc(100% - 250px)'}
          maxWidth={'lg'}
          padding={{xs: '10px 20px', md: '15px 30px', lg: '20px 40px'}}
          gap={'10px'}
        >
          <Skeleton
            variant="rectangular"
            animation={'wave'}
            width={'100%'}
            height={250}
          />
          {/* <Grid> */}
          <Skeleton
            variant="rectangular"
            animation={'wave'}
            height={'100%'}
            sx={{
              width: {xs: '100%', md: 'calc(50% - 5px)'},
            }}
          />
          <Skeleton
            variant="rectangular"
            animation={'wave'}
            width={'calc(50% - 5px)'}
            height={'100%'}
            sx={{
              display: {xs: 'none', md: 'block'},
            }}
          />
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default SkeletonJob;
