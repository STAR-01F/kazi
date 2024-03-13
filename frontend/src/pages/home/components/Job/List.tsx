import MenuListButton from '@components/button/MenuListButton';
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {DeleteUserJob, UpdateUserJobStatus} from '@services/firebase/userJobs';
import LaunchIcon from '@mui/icons-material/Launch';
import {Link} from 'react-router-dom';
import {useJobs} from '@services/firebase/hooks/useJobs';
type JobListProps = {
  userJobsId: string;
  jobID: string;
  companyName: string;
  logoPath: string;
  jobTitle: string;
  status: string;
};
const JobList = ({
  userJobsId,
  jobID,
  companyName,
  logoPath,
  jobTitle,
  status,
}: JobListProps) => {
  const {user} = useAuth();
  const {jobs, setJobs} = useJobs();
  const handleDeleteJob = async () => {
    if (!user?.uid) return;
    const resp = await DeleteUserJob(user.uid, userJobsId);
    if (resp.status === 'Success') {
      console.log(resp);
      const jobsToKeep = jobs.filter((job) => job.id !== userJobsId);
      setJobs(jobsToKeep);
      return;
    }
    console.error(resp);
  };

  const handleUpdateJobStatus = async (status: string) => {
    if (!user?.uid) return;
    const resp = await UpdateUserJobStatus(userJobsId, status);

    if (resp.status === 'Success') {
      console.log(resp);
      const updatedJobs = jobs.map((job) => {
        if (job.id === userJobsId) {
          return {...job, status};
        }
        return job;
      });
      setJobs(updatedJobs);
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
          Update
        </MenuListButton>
      </TableCell>
    </TableRow>
  );
};

export default JobList;
