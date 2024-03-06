import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
  label?: React.ReactNode;
  children?: React.ReactNode;
};

const CircularProgressWithLabel = ({
  value,
  children,
  label,
  ...props
}: CircularProgressWithLabelProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{position: 'relative', display: 'inline-flex'}}>
        <CircularProgress
          variant="determinate"
          value={value}
          {...props}
          thickness={5}
        />
        {children && (
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {children}
          </Box>
        )}
      </Box>
      {label}
    </Box>
  );
};

export default CircularProgressWithLabel;
