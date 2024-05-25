import MenuListButton from '@components/button/MenuListButton';
import {
  Avatar,
  Box,
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
import {Timestamp} from 'firebase/firestore';
import {useState} from 'react';
import ConfirmDelete from '@components/dialog/ConfirmDelete';
type JobListProps = {
  userJobsId: string;
  jobID: string;
  companyName: string;
  logoPath: string;
  jobTitle: string;
  status: string;
  time: Timestamp;
};
const JobList = ({
  userJobsId,
  jobID,
  companyName,
  logoPath,
  jobTitle,
  status,
  time,
}: JobListProps) => {
  const {user} = useAuth();
  const {jobs, setJobs} = useJobs();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const timeToStr = time.toDate().toLocaleDateString(undefined, dateOptions);
  const [openDialog, setOpenDialog] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
          if (status === 'Saved') {
            return {...job, status};
          } else {
            const updatedAt = Timestamp.now();
            return {
              ...job,
              status: status,
              statusUpdates: {
                ...job.statusUpdates,
                [status]: updatedAt,
              },
            };
          }
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
      action: () => setOpenDialog(true),
    },
  ];
  return (
    <TableRow key={jobID}>
      <TableCell
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // fill the square
        }}
      >
        {!imgError ? (
          <Box
            sx={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              // fill the square
            }}
          >
            <Avatar
              alt={companyName}
              src={logoPath}
              variant="square"
              onError={() => {
                setImgError(true);
              }}
              sx={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              // fill the square
            }}
          >
            <Typography variant="caption">{companyName}</Typography>
          </Box>
        )}
      </TableCell>
      <TableCell>
        <Typography variant="caption">{companyName}</Typography>
      </TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{timeToStr}</TableCell>

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
      <ConfirmDelete
        open={openDialog}
        onCancelClick={handleCloseDialog}
        onDeleteClick={handleDeleteJob}
      ></ConfirmDelete>
    </TableRow>
  );
};

export default JobList;
