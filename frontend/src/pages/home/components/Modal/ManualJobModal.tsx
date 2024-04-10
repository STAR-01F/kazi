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
import {CreateUserJob} from '@services/firebase/userJobs';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {useProfile} from '@services/firebase/hooks/useProfile';
import {Timestamp} from 'firebase/firestore';
import UserProfile from 'src/@types/userProfile';
import UpdateStreak from '@services/firebase/userProfiles/Update';
import {Autocomplete, Box, Grid} from '@mui/material';

type ManualJobModalProps = {
  toggle: () => void;
  onClose: () => void;
  setSubmitting: (submitting: boolean) => void;
};

interface SaveJobError {
  title?: string;
  jobLink?: string;
  company?: string;
  description?: string;
}

interface ClearbitLogo {
  name: string;
  domain: string;
  logo: string;
}

const ManualJobModal = ({
  toggle,
  onClose,
  setSubmitting,
}: ManualJobModalProps) => {
  const [title, setTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Saved');
  const {user} = useAuth();
  const {jobs, setJobs} = useJobs();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SaveJobError>({});
  const {userProfile, setUserProfile} = useProfile();
  const [options, setOptions] = useState<ClearbitLogo[]>([]);
  const [companyValue, setCompanyValue] = useState<ClearbitLogo | null>(null);

  const handleInputChange = async (_event: any, value: string) => {
    const result = await GetCompanyLogo(value);
    setOptions(result);
    //console.log('new value \n', companyValue);
  };

  const GetCompanyLogo = async (src: string) => {
    if (src.length === 0) return;
    const response = await fetch(
      `${'https://autocomplete.clearbit.com/v1/companies/suggest?query='}${src}`
    );

    if (response.status !== 200) {
      return;
    }

    const companyData = await response.json();
    return companyData;
  };

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
    setSubmitting(true);

    const job: Partial<Job> = {
      title: title,
      company: company,
      jobLink: jobLink,
      description: description,
      jobSource: 'manual',
    };

    job.jobLink?.startsWith('http') || job.jobLink?.startsWith('https')
      ? null
      : (job.jobLink = `https://${job.jobLink}`);

    // awaiting the jobID to navigate to the correct job page
    const resp = await CreateJob(job);

    // check if resp is an error
    if (resp.status === 'Error') {
      console.error(resp);
      setSubmitting(false);
      return;
    }

    const createdUserJob = await CreateUserJob(user.uid, status, resp.data);
    if (createdUserJob.status === 'Error') {
      console.error(createdUserJob);
      setSubmitting(false);
      return;
    }

    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const streakDay = userProfile?.streakLastModified?.toDate() || today;

    //check difference between today and streakDay
    const timeDiff =
      (today.setHours(0, 0, 0, 0) - streakDay?.setHours(0, 0, 0, 0)) /
      1000 /
      60 /
      60;

    if (userProfile?.streakLastModified !== undefined && timeDiff >= 24) {
      setUserProfile({
        ...userProfile,
        currentStreak: userProfile.currentStreak + 1,
        streakLastModified: Timestamp.fromDate(today) as Timestamp,
      } as UserProfile);

      UpdateStreak(
        user.uid,
        userProfile?.currentStreak + 1,
        Timestamp.fromDate(today) as Timestamp
      );
    } else {
      if (userProfile?.streakLastModified !== undefined && timeDiff < 24) {
        setUserProfile({
          ...userProfile,
          currentStreak: userProfile.currentStreak,
        } as UserProfile);
      } else {
        setUserProfile({
          ...userProfile,
          currentStreak: 1,
          streakLastModified: Timestamp.fromDate(today) as Timestamp,
        } as UserProfile);
        UpdateStreak(user.uid, 1, Timestamp.fromDate(today) as Timestamp);
      }
    }

    setSubmitting(false);
    onClose();

    setJobs([...jobs, createdUserJob.data]);
    // data returned is the jobId is navigated to.
    navigate(`job/${resp.data?.id}`);
  };
  return (
    <>
      <DialogContent>
        <DialogContentText mb={1}>
          Please enter the following details
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
          }}
          fullWidth
          error={!!errors.jobLink}
          helperText={errors.jobLink}
        />

        {/* Autocomplete should replace Company's name text field */}
        <TextField
          required
          sx={{marginBottom: 2}}
          id="company-name"
          name="company"
          label="Company's Name"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          fullWidth
          error={!!errors.company}
          helperText={errors.company}
        />

        <Autocomplete
          disablePortal
          id="company-logo"
          getOptionLabel={(option: any) =>
            typeof option === 'string' ? option : `${option.domain}`
          }
          filterOptions={(x) => x || options}
          options={options || []}
          autoComplete
          includeInputInList
          value={companyValue}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          filterSelectedOptions
          noOptionsText="Company Not Found"
          onChange={(_event: any, newValue: ClearbitLogo | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setCompanyValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Company's Name" required />
          )}
          onInputChange={handleInputChange}
          renderOption={(props, option) => {
            return (
              <li {...props}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid
                    component={'img'}
                    src={option.logo}
                    item
                    xs={1}
                    // sx={{display: 'flex', width: 20, height: 20}}
                  />
                  <Grid
                    item
                    xs={11}
                    // sx={{width: 'calc(100% - 44px)', wordWrap: 'break-word'}}
                  >
                    <Box
                      // key={index}
                      component="span"
                      sx={{fontWeight: '500'}}
                    >
                      {option.name}
                    </Box>
                  </Grid>
                </Grid>
              </li>
            );
          }}
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
