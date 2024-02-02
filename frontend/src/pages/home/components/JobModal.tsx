import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddJob from './AddJob';
import CreateJob from '@utils/savejob';
import type {Job} from 'src/@types';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const JobStatus = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Accepted',
];
export default function JobModal() {
  const [open, setOpen] = React.useState(false);
  const [company, setCompany] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('');
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddJob = async () => {
    const job: Partial<Job> = {
      company: company,
      title: title,
      description: description,
      status: status,
    };

    // awaiting the jobID to navigate to the correct job page
    const resp = await CreateJob(job);
    console.log(resp);
    // check if resp is an error
    if (resp.status === 'error') {
      return;
    }

    setTitle('');
    setDescription('');
    handleClose();
    // data returned is the jobId is navigated to.
    if ('data' in resp) {
      navigate(`/${resp.data}`);
    }
  };

  return (
    <React.Fragment>
      <AddJob handleClickOpen={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Job</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleAddJob}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
