import {Typography} from '@mui/material';

type ManualDescriptionProps = {
  description: string;
};

const ManualDescription = ({description}: ManualDescriptionProps) => {
  console.log('checking description', description);
  return (
    <>
      {description.split('\n').map((line, index) => {
        if (line.includes('•')) {
          return (
            <Typography
              mb={2}
              variant="body1"
              key={index}
              align="justify"
              sx={{paddingLeft: '20px'}}
            >
              {line}
            </Typography>
          );
        }
        return (
          <Typography mb={2} variant="body1" key={index} align="justify">
            {line}
          </Typography>
        );
      })}
    </>
  );
};

export default ManualDescription;
