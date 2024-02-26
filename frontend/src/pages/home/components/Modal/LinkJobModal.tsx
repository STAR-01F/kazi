import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {useState} from 'react';
import jobStatus from '@repository/job.json';
import Scrapper from '@services/scraper';
import {CreateJob} from '@services/firebase/jobs';
import {useAuth} from '@services/firebase/hooks/useAuth';
import {useNavigate} from 'react-router-dom';

type LinkJobModalProps = {
  toggle: () => void;
  onClose: () => void;
};
const LinkJobModal = ({toggle, onClose}: LinkJobModalProps) => {
  const [jobLink, setJobLink] = useState('');
  const [status, setStatus] = useState('');
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleAddJob = async () => {
    if (!user?.uid) return;
    const resp = await Scrapper(jobLink);
    if (resp.status == 'Error') {
      console.error(resp);
      return;
    }
    const jobData = {userid: user.uid, status: status, ...resp.data};
    console.log(jobData);
    const createdJob = await CreateJob(jobData);
    if (createdJob.status == 'Error') {
      console.error(createdJob);
      return;
    }
    console.log('created data', createdJob.data);
    navigate(`job/${createdJob.data?.id}`);
    onClose();
  };
  return (
    <>
      <DialogContent>
        <DialogContentText mb={1}>
          Please enter the URL of the job posting.
        </DialogContentText>
        <TextField
          autoFocus
          required
          sx={{marginBottom: 2}}
          id="job-link"
          name="job-link"
          label="Link"
          placeholder=""
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel id="job-status-input">Status</InputLabel>
          <Select
            labelId="job-status-input"
            id="job-status-select"
            label="Status"
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
        <DialogContentText mb={1}>
          or add{' '}
          <Link style={{cursor: 'pointer'}} onClick={toggle}>
            manually
          </Link>
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

export default LinkJobModal;
