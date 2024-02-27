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

interface SaveJobError {
  title?: string;
  jobLink?: string;
  company?: string;
  description?: string;
}
const ManualJobModal = ({toggle, onClose}: ManualJobModalProps) => {
  const [title, setTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Saved');
  const {user} = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SaveJobError>({});

  const validateForm = () => {
    const newErrors: SaveJobError = {};

    if (title === '') {
      newErrors.title = 'Title is required';
    }
    if (jobLink === '') {
      newErrors.jobLink = 'Link is required';
    }
    if (company === '') {
      newErrors.company = 'Company is required';
    }
    if (description === '') {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
  };

  const handleAddJob = async () => {
    if (!user?.uid) return;

    validateForm();

    const job: Partial<Job> = {
      userid: user.uid,
      title: title,
      company: company,
      joblink: jobLink,
      description: description,
      status: status,
      jobsource: 'manual',
    };

    // awaiting the jobID to navigate to the correct job page
    const resp = await CreateJob(job);

    // check if resp is an error
    if (resp.status === 'Error') {
      console.error(resp);
      return;
    }

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
          required
          autoFocus
          sx={{marginBottom: 2}}
          id="job-title"
          name="job"
          label="Title"
          placeholder=""
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log('title=========>', title);
          }}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          required
          sx={{marginBottom: 2}}
          id="job-link"
          name="job-link"
          label="Link"
          placeholder=""
          value={jobLink}
          onChange={(e) => {
            setJobLink(e.target.value);
            console.log('job link=========>', e.target.value);
          }}
          fullWidth
          error={!!errors.jobLink}
          helperText={errors.jobLink}
        />
        <TextField
          required
          sx={{marginBottom: 2}}
          id="company-name"
          name="company"
          label="Company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            console.log('company=========>', e.target.value);
          }}
          fullWidth
          error={!!errors.company}
          helperText={errors.company}
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
        <TextField
          required
          sx={{mb: 2}}
          id="job-description"
          label="Description"
          name="description"
          placeholder=""
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            console.log('description=========>', e.target.value);
          }}
          multiline
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
        />
        <DialogContentText mb={1}>
          or add{' '}
          <Link style={{cursor: 'pointer'}} onClick={toggle}>
            link
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
export default ManualJobModal;
