import {Typography} from '@mui/material';

type OttaDescriptionProps = {
  description: string;
};
const OttaDescription = ({description}: OttaDescriptionProps) => {
  return (
    <>
      {description.split('*').map((line, index) => {
        if (line.length > 1 && line.length < 22) {
          return (
            <Typography
              mb={2}
              variant="h6"
              fontWeight="bold"
              key={index}
              align="justify"
            >
              {line}
            </Typography>
          );
        } else if (line.length > 1)
          return (
            <li key={index} style={{paddingLeft: '20px', marginBottom: '1rem'}}>
              {line}
            </li>
          );
      })}
    </>
  );
};

export default OttaDescription;
