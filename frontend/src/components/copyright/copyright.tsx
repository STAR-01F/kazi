import {Typography} from '@mui/material';
import Link from '@mui/material/Link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{...props.sx}}
    >
      {'Copyright © '}
      <Link color="inherit" href={props.href}>
        Kazi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
