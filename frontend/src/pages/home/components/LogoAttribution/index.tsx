import {Link, Box} from '@mui/material';

const LogoAttribution = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        fontSize: '12px',
      }}
    >
      <Link href="https://clearbit.com">Logos provided by Clearbit</Link>
    </Box>
  );
};

export {LogoAttribution};
