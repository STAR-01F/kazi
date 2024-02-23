import {CircularProgress, Container, Grid, SxProps} from '@mui/material';

type PageCircularProps = {
  sx?: SxProps;
};
const PageCircular = ({sx}: PageCircularProps) => {
  return (
    <Container
      component={Grid}
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{display: 'flex', overflowY: 'auto', ...sx}}
    >
      <CircularProgress />
    </Container>
  );
};

export default PageCircular;
