import {Avatar, ListItem, ListItemText} from '@mui/material';

type JobListProps = {
  jobID: string;
  companyName: string;
  logoPath: string;
  jobTitle: string;
};
const JobList = ({companyName, logoPath, jobTitle}: JobListProps) => {
  console.log(logoPath);
  return (
    <ListItem>
      <Avatar
        alt={companyName}
        src={logoPath}
        variant="square"
        sx={{
          width: '20%',
          objectFit: 'contain',
        }}
      />
      <ListItemText primary={jobTitle} secondary={companyName} />
    </ListItem>
  );
};

export default JobList;
