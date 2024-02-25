import MenuListButton from '@components/button/MenuListButton';
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {DeleteJob, UpdateJobStatus} from '@services/firebase/jobs';
import LaunchIcon from '@mui/icons-material/Launch';
import {Link} from 'react-router-dom';
type JobListProps = {
  jobID: string;
  companyName: string;
  logoPath: string;
  jobTitle: string;
  status: string;
};
const JobList = ({
  jobID,
  companyName,
  logoPath,
  jobTitle,
  status,
}: JobListProps) => {
  console.log(logoPath);
  const {user} = useAuth();
  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    const resp = await DeleteJob(user.uid, jobID);
    if (resp.status === 'Success') {
      console.log(resp);
      return;
    }
    console.error(resp);
  };

  const handleUpdateJobStatus = async (status: string) => {
    if (!user?.uid) return;
    const resp = await UpdateJobStatus(user.uid, jobID, status);

    if (resp.status === 'Success') {
      console.log(resp);
      return;
    }
    console.error(resp);
  };

  const moveMenulist = [
    {name: 'Saved', action: () => handleUpdateJobStatus('Saved')},
    {name: 'Applied', action: () => handleUpdateJobStatus('Applied')},
    {name: 'Interview', action: () => handleUpdateJobStatus('Interview')},
    {name: 'Rejected', action: () => handleUpdateJobStatus('Rejected')},
    {
      name: 'Remove',
      action: handleDeleteJob,
    },
  ];
  return (
    <TableRow key={jobID}>
      <TableCell>
        <Avatar
          alt={companyName}
          src={logoPath}
          variant="square"
          sx={{
            width: '100px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="caption">{companyName}</Typography>
      </TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <IconButton component={Link} to={`job/${jobID}`}>
          <LaunchIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <MenuListButton
          variant="contained"
          size="small"
          menuActionList={moveMenulist}
        >
          Move
        </MenuListButton>
      </TableCell>
    </TableRow>
  );
};

export default JobList;
