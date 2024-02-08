import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from './AddJob';
import {CreateJob} from '@services/firebase/jobs';
import type {Job} from 'src/@types';
import {FormControl, InputLabel, Link, MenuItem, Select} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@services/firebase/hooks/useAuth';

const JobStatus = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Accepted',
];
type ManualProps = {
  toggle: () => void;
  onClose: () => void;
};
const Manual = ({toggle, onClose}: ManualProps) => {
  const [company, setCompany] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('');
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleAddJob = async () => {
    if (!user?.uid) return;
    const job: Partial<Job> = {
      userid: user.uid,
      company: company,
      title: title,
      description: description,
      status: status,
    };

    // awaiting the jobID to navigate to the correct job page
    const resp = await CreateJob(job);
    console.log(resp);
    // check if resp is an error
    if (resp.status === 'Error') {
      return;
    }

    setTitle('');
    setDescription('');
    onClose();
    // data returned is the jobId is navigated to.
    navigate(`job/${resp.data?.id}`);
  };
  return (
    <>
      <DialogContent>
        <DialogContentText mb={1}>
          Please enter the details for the new job.
        </DialogContentText>
        <TextField
          autoFocus
          required
          sx={{marginBottom: 2}}
          id="job-title"
          name="job"
          label="Job Title"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          autoFocus
          required
          sx={{marginBottom: 2}}
          id="company-name"
          name="company"
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel id="job-status-input">Job Status</InputLabel>
          <Select
            labelId="job-status-input"
            id="job-status-select"
            label="Job Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {JobStatus.map((status, i) => (
              <MenuItem key={`${status}-${i}`} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{mb: 2}}
          id="job-description"
          label="Job Description"
          name="description"
          placeholder=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          fullWidth
          required
        />
        <DialogContentText mb={1}>
          or add <Link onClick={toggle}>link</Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleAddJob}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};
type JobLinkModalProps = {
  toggle: () => void;
  onClose: () => void;
};
const JobLinkModal = ({toggle, onClose}: JobLinkModalProps) => {
  const [jobLink, setJobLink] = React.useState('');
  const handleAddJob = () => {};
  return (
    <>
      <DialogContent>
        <DialogContentText mb={1}>
          Please enter the link of the job.
        </DialogContentText>
        <TextField
          autoFocus
          required
          sx={{marginBottom: 2}}
          id="job-link"
          name="job-link"
          label="Job Link"
          placeholder=""
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
          fullWidth
        />
        <DialogContentText mb={1}>
          or add <Link onClick={toggle}>manually</Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleAddJob}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};
export default function JobModal() {
  const [open, setOpen] = React.useState(false);
  const [openManual, setManualOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    setManualOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <AddJob handleClickOpen={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add Job</DialogTitle>
        {openManual ? (
          <Manual toggle={toggle} onClose={handleClose} />
        ) : (
          <JobLinkModal toggle={toggle} onClose={handleClose} />
        )}
      </Dialog>
    </React.Fragment>
  );
}
