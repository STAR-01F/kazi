import {Typography} from '@mui/material';

type DescriptionProps = {
  description: string;
};
const Description = ({description}: DescriptionProps) => {
  return (
    <>
      {description.split('\n').map((line, index) => {
        if (line.length < 50) {
          return (
            <Typography
              variant="h6"
              fontWeight="bold"
              key={index}
              align="justify"
            >
              {line}
            </Typography>
          );
        }
        return (
          <Typography variant="body1" key={index} align="justify">
            {line}
          </Typography>
        );
      })}
    </>
  );
};

export default Description;
