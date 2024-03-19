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
import {useFeedback} from '@hooks/useFeeback';
import {CreateUserJob} from '@services/firebase/userJobs';
import {useJobs} from '@services/firebase/hooks/useJobs';
import {useProfile} from '@services/firebase/hooks/useProfile';
import UpdateStreak from '@services/firebase/userProfiles/Update';
import UserProfile from 'src/@types/userProfile';
import {Timestamp} from 'firebase/firestore';

type LinkJobModalProps = {
  toggle: () => void;
  onClose: () => void;
  setSubmitting: (value: boolean) => void;
};

interface SaveJobError {
  jobLink?: string;
}
const LinkJobModal = ({toggle, onClose, setSubmitting}: LinkJobModalProps) => {
  const [jobLink, setJobLink] = useState('');
  const {jobs, setJobs} = useJobs();
  const {userProfile, setUserProfile} = useProfile();
  const [status, setStatus] = useState('Saved');
  const {setFeedback} = useFeedback();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SaveJobError>({});

  const handleAddJob = async () => {
    if (!user?.uid) return;
    if (jobLink === '') {
      setErrors({
        jobLink: 'Job link is required',
      });
      return;
    }
    setSubmitting(true);
    const resp = await Scrapper(jobLink);
    if (resp.status == 'Error') {
      setErrors({
        jobLink: resp.message as string,
      });
      setSubmitting(false);
      return;
    }
    const createdJob = await CreateJob(resp.data);

    if (createdJob.status === 'Error') {
      console.error(createdJob);
      setSubmitting(false);
      return;
    }

    const createdUserJob = await CreateUserJob(
      user.uid,
      status,
      createdJob.data
    );

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
    setFeedback({
      type: 'success',
      message: 'Job added successfully',
    });
    setJobs([...jobs, createdUserJob.data]);

    navigate(`job/${createdJob.data?.id}`);
    setSubmitting(false);
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
          onChange={(e) => {
            setJobLink(e.target.value);
            if (errors.jobLink) {
              setErrors({
                jobLink: undefined,
              });
            }
          }}
          fullWidth
          error={!!errors.jobLink}
          helperText={errors.jobLink ? errors.jobLink : 'Supported URL: Otta'}
        />
        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel id="job-status-input">Status</InputLabel>
          <Select
            labelId="job-status-input"
            id="job-status-select"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
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
