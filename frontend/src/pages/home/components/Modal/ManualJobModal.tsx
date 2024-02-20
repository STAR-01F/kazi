import {CreateJob} from '@services/firebase/jobs';
import type {Job} from 'src/@types';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useState} from 'react';
import jobStatus from '@repository/job.json';

type ManualJobModalProps = {
  toggle: () => void;
  onClose: () => void;
};
const ManualJobModal = ({toggle, onClose}: ManualJobModalProps) => {
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleAddJob = async () => {
    if (!user?.uid) return;
    const job: Partial<Job> = {
      userid: user.uid,
      company: company,
      joblink: jobLink,
      title: title,
      description: description,
      status: status,
      jobSource: 'manual',
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
          id="job-link"
          name="job-link"
          label="Job Link"
          placeholder=""
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
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
            {jobStatus.status.map((status, i) => (
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
          or add <Link style={{cursor: 'pointer'}} onClick={toggle}>link</Link>
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
export default ManualJobModal;
