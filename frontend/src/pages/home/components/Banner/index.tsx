import {Box, Grid} from '@mui/material';
import RightSection from './RightSection';
import LeftSection from './LeftSection';

const Banner = () => {
  return (
    <Box
      component={Grid}
      flexDirection={{xs: 'column-reverse', sm: 'row'}}
      id="home-page-header"
      mb={2}
      display={'flex'}
      justifyContent={'space-between'}
      alignContent={'center'}
    >
      <LeftSection />
      <RightSection />
    </Box>
  );
};

export default Banner;
